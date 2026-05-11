"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "@/lib/supabase";

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  messages: Message[];
}

interface ChatContextType {
  conversations: Conversation[];
  activeConvId: string | null;
  setActiveConvId: (id: string | null) => void;
  sendMessage: (text: string, convId?: string) => Promise<void>;
  startConversation: (participantId: string, participantName: string) => void;
  markAsRead: (convId: string) => Promise<void>;
  unreadCount: number;
  loading: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load conversations from Supabase
  useEffect(() => {
    if (!user?.id) {
      setConversations([]);
      setLoading(false);
      return;
    }

    loadConversations();
    setupRealtimeSubscription();
  }, [user?.id]);

  const loadConversations = async () => {
    if (!user?.id) return;

    const isAdmin = user.role === "ADMIN";

    // Get all messages involving this user
    const { data: messages, error } = await supabase
      .from("messages")
      .select(`
        id,
        text,
        read,
        created_at,
        sender:users!messages_senderId_fkey (id, name, email),
        receiver:users!messages_receiverId_fkey (id, name, email)
      `)
      .or(`senderId.eq.${user.id},receiverId.eq.${user.id}`)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error loading conversations:", error);
      setLoading(false);
      return;
    }

    // Group messages by conversation
    const convMap = new Map<string, Message[]>();
    const participantMap = new Map<string, { name: string }>();

    messages?.forEach(msg => {
      const sender = Array.isArray(msg.sender) ? msg.sender[0] : msg.sender;
      const receiver = Array.isArray(msg.receiver) ? msg.receiver[0] : msg.receiver;
      const senderId = sender?.id || "";
      const receiverId = receiver?.id || "";
      const otherId = senderId === user.id ? receiverId : senderId;
      const otherName = senderId === user.id ? receiver?.name : sender?.name;

      if (!convMap.has(otherId)) {
        convMap.set(otherId, []);
      }
      convMap.get(otherId)?.push({
        id: msg.id,
        senderId: senderId,
        senderName: sender?.name || "",
        text: msg.text,
        timestamp: new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        read: msg.read || false,
      });

      if (otherName) {
        participantMap.set(otherId, { name: otherName });
      }
    });

    const convs: Conversation[] = Array.from(convMap.entries()).map(([participantId, msgs]) => {
      const lastMsg = msgs[msgs.length - 1];
      const participant = participantMap.get(participantId);
      const isAdmin = user.role === "ADMIN";
      const unread = isAdmin ? lastMsg.senderId !== user.id && !lastMsg.read : !lastMsg.read;

      return {
        id: participantId,
        participantId,
        participantName: participant?.name || "Utilisateur",
        lastMessage: lastMsg.text,
        time: lastMsg.timestamp,
        unread,
        messages: msgs,
      };
    });

    setConversations(convs);
    setLoading(false);
  };

  const setupRealtimeSubscription = () => {
    if (!user?.id) return;

    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `senderId=eq.${user.id},receiverId=eq.${user.id}`,
        },
        (payload) => {
          // Reload conversations when new message arrives
          loadConversations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendMessage = async (text: string, convId?: string) => {
    const targetId = convId || activeConvId;
    if (!targetId || !text.trim() || !user?.id) return;

    const isAdmin = user.role === "ADMIN";
    const receiverId = isAdmin ? targetId : "admin";

    const { error } = await supabase.from("messages").insert({
      senderId: user.id,
      receiverId,
      text: text.trim(),
      read: false,
    });

    if (error) {
      console.error("Error sending message:", error);
      return;
    }

    // Reload to show new message
    loadConversations();
  };

  const startConversation = useCallback((participantId: string, participantName: string) => {
    // Check if conversation already exists
    if (conversations.find(c => c.id === participantId)) {
      setActiveConvId(participantId);
      return;
    }

    // Create new conversation locally (will be populated when first message is sent)
    const newConv: Conversation = {
      id: participantId,
      participantId,
      participantName,
      lastMessage: "",
      time: "Maintenant",
      unread: false,
      messages: []
    };
    setConversations(prev => [newConv, ...prev]);
    setActiveConvId(participantId);
  }, [conversations]);

  const markAsRead = async (convId: string) => {
    if (!user?.id) return;

    // Mark all unread messages from this conversation as read
    const { error } = await supabase
      .from("messages")
      .update({ read: true })
      .eq("receiverId", user.id)
      .eq("senderId", convId);

    if (error) {
      console.error("Error marking as read:", error);
      return;
    }

    setConversations(prev => prev.map(c => c.id === convId ? { ...c, unread: false } : c));
  };

  const unreadCount = conversations.filter(c => c.unread).length;

  return (
    <ChatContext.Provider value={{ conversations, activeConvId, setActiveConvId, sendMessage, startConversation, markAsRead, unreadCount, loading }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within a ChatProvider");
  return context;
};

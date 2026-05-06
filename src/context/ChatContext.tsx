"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
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
  sendMessage: (text: string, convId?: string) => void;
  startConversation: (participantId: string, participantName: string) => void;
  markAsRead: (convId: string) => void;
  unreadCount: number;
}

const STORAGE_KEY = "marketbenin_chat";

const ChatContext = createContext<ChatContextType | undefined>(undefined);

function loadConvos(): Conversation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveConvos(convos: Conversation[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(convos));
}

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>(loadConvos);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);

  useEffect(() => { saveConvos(conversations); }, [conversations]);

  // Sync across tabs
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setConversations(loadConvos());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const sendMessage = useCallback((text: string, convId?: string) => {
    const targetId = convId || activeConvId;
    if (!targetId || !text.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const isAdmin = user?.role === "ADMIN";
    const senderId = isAdmin ? "admin" : (user?.email || "anonymous");
    const senderName = isAdmin ? "Admin" : (user?.name || "Client");

    setConversations(prev => {
      const existing = prev.find(c => c.id === targetId);
      const newMsg: Message = { id: Date.now().toString(), senderId, senderName, text: text.trim(), timestamp: now };
      if (existing) {
        return prev.map(c => c.id === targetId ? {
          ...c,
          lastMessage: text.trim(),
          time: now,
          unread: senderId !== "admin", // unread for admin when client writes
          messages: [...c.messages, newMsg]
        } : c);
      }
      // Create new conversation if not exists
      const newConv: Conversation = {
        id: targetId,
        participantId: isAdmin ? targetId : "admin",
        participantName: isAdmin ? targetId.replace(/@.*/, "") : "Admin MarketBénin",
        lastMessage: text.trim(),
        time: now,
        unread: senderId !== "admin",
        messages: [newMsg]
      };
      return [newConv, ...prev];
    });
  }, [activeConvId, user]);

  const startConversation = useCallback((participantId: string, participantName: string) => {
    setConversations(prev => {
      if (prev.find(c => c.id === participantId)) return prev;
      const newConv: Conversation = {
        id: participantId,
        participantId,
        participantName,
        lastMessage: "",
        time: "Maintenant",
        unread: false,
        messages: []
      };
      return [newConv, ...prev];
    });
    setActiveConvId(participantId);
  }, []);

  const markAsRead = useCallback((convId: string) => {
    setConversations(prev => prev.map(c => c.id === convId ? { ...c, unread: false } : c));
  }, []);

  const unreadCount = conversations.filter(c => c.unread).length;

  return (
    <ChatContext.Provider value={{ conversations, activeConvId, setActiveConvId, sendMessage, startConversation, markAsRead, unreadCount }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within a ChatProvider");
  return context;
};

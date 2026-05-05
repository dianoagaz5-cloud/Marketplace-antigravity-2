"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  messages: Message[];
}

interface ChatContextType {
  conversations: Conversation[];
  activeConvId: string | null;
  setActiveConvId: (id: string | null) => void;
  sendMessage: (text: string) => void;
  startConversation: (vendeurId: string, vendeurName: string, vendeurAvatar?: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "style-cotonou",
    participantName: "Style Cotonou",
    participantAvatar: "SC",
    lastMessage: "Bonjour ! Est-ce que les sneakers Nike sont encore disponibles ?",
    time: "14:20",
    unread: true,
    messages: [
      { id: "1", senderId: "me", text: "Bonjour ! Est-ce que les sneakers Nike sont encore disponibles ?", timestamp: "14:15" },
      { id: "2", senderId: "style-cotonou", text: "Bonjour Amina, oui il nous en reste quelques-unes en taille 42.", timestamp: "14:20" },
    ]
  },
  {
    id: "dev-benin",
    participantName: "Dev Bénin Studio",
    participantAvatar: "DB",
    lastMessage: "Parfait, je vous envoie le devis demain.",
    time: "Hier",
    unread: false,
    messages: [
      { id: "1", senderId: "me", text: "J'ai besoin d'un site e-commerce pour ma boutique.", timestamp: "Hier" },
      { id: "2", senderId: "dev-benin", text: "Parfait, je vous envoie le devis demain.", timestamp: "Hier" },
    ]
  },
  {
    id: "client-1",
    participantName: "Moussa Traoré",
    participantAvatar: "MT",
    lastMessage: "Bonjour, j'aimerais commander 5 unités de votre produit.",
    time: "10:05",
    unread: true,
    messages: [
      { id: "1", senderId: "client-1", text: "Bonjour, j'aimerais commander 5 unités de votre produit. Est-ce possible d'avoir une réduction ?", timestamp: "10:05" },
    ]
  }
];

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);

  const sendMessage = (text: string) => {
    if (!activeConvId || !text.trim()) return;

    setConversations(prev => prev.map(conv => {
      if (conv.id === activeConvId) {
        const newMessage: Message = {
          id: Date.now().toString(),
          senderId: "me",
          text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        return {
          ...conv,
          lastMessage: text,
          time: newMessage.timestamp,
          messages: [...conv.messages, newMessage]
        };
      }
      return conv;
    }));
  };

  const startConversation = (vendeurId: string, vendeurName: string, vendeurAvatar?: string) => {
    const existing = conversations.find(c => c.id === vendeurId);
    if (!existing) {
      const newConv: Conversation = {
        id: vendeurId,
        participantName: vendeurName,
        participantAvatar: vendeurAvatar || vendeurName[0],
        lastMessage: "Nouvelle conversation",
        time: "Maintenant",
        unread: false,
        messages: []
      };
      setConversations([newConv, ...conversations]);
    }
    setActiveConvId(vendeurId);
  };

  return (
    <ChatContext.Provider value={{ conversations, activeConvId, setActiveConvId, sendMessage, startConversation }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within a ChatProvider");
  return context;
};

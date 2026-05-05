"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Send, MessageSquare, 
  MoreVertical, Phone, Video, Info,
  ChevronLeft, Package, Clock
} from "lucide-react";
import { useChat, Conversation } from "@/context/ChatContext";
import { useAuth } from "@/context/AuthContext";

export default function MessagesPage() {
  const { conversations, activeConvId, setActiveConvId, sendMessage } = useChat();
  const { user } = useAuth();
  const [inputText, setInputText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find(c => c.id === activeConvId);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeConv?.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      sendMessage(inputText);
      setInputText("");
    }
  };

  if (!user) {
    return <div style={{ padding: "5rem", textAlign: "center" }}>Veuillez vous connecter pour voir vos messages.</div>;
  }

  return (
    <div style={{ 
      height: "calc(100vh - 64px)", 
      display: "flex", 
      backgroundColor: "hsl(var(--background))",
      overflow: "hidden" 
    }}>
      {/* Sidebar - Conversations */}
      <aside style={{ 
        width: "360px", 
        borderRight: "1px solid hsl(var(--border) / 0.5)", 
        display: "flex", 
        flexDirection: "column",
        backgroundColor: "hsl(var(--card))"
      }}>
        <div style={{ padding: "1.5rem", borderBottom: "1px solid hsl(var(--border) / 0.5)" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1rem", letterSpacing: "-0.02em" }}>Messages</h1>
          <div style={{ position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "hsl(var(--muted-foreground))" }} />
            <input 
              placeholder="Rechercher une discussion..." 
              style={{ width: "100%", padding: "0.625rem 1rem 0.625rem 2.5rem", borderRadius: "var(--radius)", border: "1px solid hsl(var(--border))", background: "hsl(var(--muted) / 0.3)", fontSize: "0.875rem", outline: "none" }} 
            />
          </div>
        </div>
        
        <div style={{ flex: 1, overflowY: "auto" }}>
          {conversations.map((conv) => (
            <div 
              key={conv.id} 
              onClick={() => setActiveConvId(conv.id)}
              style={{ 
                padding: "1.25rem 1.5rem", 
                cursor: "pointer", 
                backgroundColor: activeConvId === conv.id ? "hsl(var(--primary) / 0.05)" : "transparent",
                borderLeft: activeConvId === conv.id ? "4px solid hsl(var(--primary))" : "4px solid transparent",
                display: "flex", 
                gap: "1rem",
                transition: "all 0.2s"
              }}
            >
              <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-lg)", background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0 }}>
                {conv.participantAvatar && conv.participantAvatar.length > 2 ? <img src={conv.participantAvatar} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }} /> : conv.participantAvatar}
              </div>
              <div style={{ flex: 1, overflow: "hidden" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
                  <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>{conv.participantName}</span>
                  <span style={{ fontSize: "0.7rem", color: "hsl(var(--muted-foreground))" }}>{conv.time}</span>
                </div>
                <div style={{ fontSize: "0.8rem", color: conv.unread ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))", fontWeight: conv.unread ? 600 : 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {conv.lastMessage}
                </div>
              </div>
              {conv.unread && <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "hsl(var(--primary))", marginTop: "1.25rem" }} />}
            </div>
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", backgroundColor: "hsl(var(--background))" }}>
        {activeConv ? (
          <>
            {/* Chat Header */}
            <header style={{ padding: "1rem 2rem", background: "hsl(var(--card))", borderBottom: "1px solid hsl(var(--border) / 0.5)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "var(--radius)", background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                  {activeConv.participantAvatar && activeConv.participantAvatar.length > 2 ? <img src={activeConv.participantAvatar} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }} /> : activeConv.participantAvatar}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "1rem" }}>{activeConv.participantName}</div>
                  <div style={{ fontSize: "0.75rem", color: "hsl(var(--success))", fontWeight: 600 }}>En ligne</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "1rem", color: "hsl(var(--muted-foreground))" }}>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "inherit" }}><Info size={20} /></button>
              </div>
            </header>

            {/* Messages List */}
            <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {activeConv.messages.map((msg) => {
                const isMe = msg.senderId === "me";
                return (
                  <div key={msg.id} style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start" }}>
                    <div style={{ 
                      maxWidth: "70%", 
                      padding: "0.875rem 1.25rem", 
                      borderRadius: isMe ? "1.25rem 1.25rem 2px 1.25rem" : "1.25rem 1.25rem 1.25rem 2px",
                      background: isMe ? "hsl(var(--primary))" : "hsl(var(--card))",
                      color: isMe ? "white" : "hsl(var(--foreground))",
                      boxShadow: isMe ? "0 4px 12px hsl(var(--primary) / 0.2)" : "var(--shadow-sm)",
                      border: isMe ? "none" : "1px solid hsl(var(--border) / 0.5)"
                    }}>
                      <div style={{ fontSize: "0.95rem", lineHeight: 1.5 }}>{msg.text}</div>
                      <div style={{ fontSize: "0.65rem", marginTop: "0.375rem", opacity: 0.7, textAlign: "right" }}>{msg.timestamp}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} style={{ padding: "1.5rem 2rem", background: "hsl(var(--card))", borderTop: "1px solid hsl(var(--border) / 0.5)" }}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <input 
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  placeholder="Tapez votre message ici..." 
                  style={{ flex: 1, padding: "0.875rem 1.25rem", borderRadius: "var(--radius-lg)", border: "1px solid hsl(var(--border))", background: "hsl(var(--muted) / 0.3)", outline: "none", fontSize: "0.95rem" }} 
                />
                <button 
                  type="submit"
                  style={{ width: "48px", height: "48px", borderRadius: "var(--radius-lg)", background: "hsl(var(--primary))", color: "white", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px hsl(var(--primary) / 0.3)" }}
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "hsl(var(--muted-foreground))" }}>
            <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "hsl(var(--muted) / 0.5)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
              <MessageSquare size={32} />
            </div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "hsl(var(--foreground))", marginBottom: "0.5rem" }}>Vos messages</h2>
            <p style={{ fontSize: "0.95rem" }}>Sélectionnez une discussion pour commencer à discuter.</p>
          </div>
        )}
      </main>
    </div>
  );
}

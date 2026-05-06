"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Send, MessageSquare, Info, ArrowLeft } from "lucide-react";
import { useChat } from "@/context/ChatContext";
import { useAuth } from "@/context/AuthContext";

export default function MessagesPage() {
  const { conversations, activeConvId, setActiveConvId, sendMessage, markAsRead } = useChat();
  const { user } = useAuth();
  const [inputText, setInputText] = useState("");
  const [mobileShowChat, setMobileShowChat] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isAdmin = user?.role === "ADMIN";
  const myEmail = user?.email || "";

  // Filter conversations: admin sees all, client sees only their own
  const visibleConversations = isAdmin
    ? conversations
    : conversations.filter(c => c.id === myEmail || c.participantId === myEmail);

  // If client has no conversation yet, show placeholder
  const activeConv = visibleConversations.find(c => c.id === activeConvId);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeConv?.messages]);

  useEffect(() => {
    if (activeConvId) markAsRead(activeConvId);
  }, [activeConvId, activeConv?.messages.length]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      // For client, auto-target admin conversation
      const targetId = isAdmin ? activeConvId : myEmail;
      if (targetId) sendMessage(inputText, targetId);
      setInputText("");
    }
  };

  const isMyMessage = (msg: { senderId: string }) => {
    if (isAdmin) return msg.senderId === "admin";
    return msg.senderId === myEmail;
  };

  const getInitials = (name: string) => name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

  if (!user) {
    return <div style={{ padding: "5rem", textAlign: "center" }}>Veuillez vous connecter pour voir vos messages.</div>;
  }

  return (
    <div className="messages-page" style={{ height: "calc(100vh - 64px)", display: "flex", backgroundColor: "hsl(var(--background))", overflow: "hidden" }}>
      {/* Sidebar */}
      <aside className="msg-sidebar" style={{ width: "360px", borderRight: "1px solid hsl(var(--border) / 0.5)", display: "flex", flexDirection: "column", backgroundColor: "hsl(var(--card))" }}>
        <div style={{ padding: "1.5rem", borderBottom: "1px solid hsl(var(--border) / 0.5)" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1rem", letterSpacing: "-0.02em" }}>Messages</h1>
          <div style={{ position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "hsl(var(--muted-foreground))" }} />
            <input placeholder="Rechercher..." style={{ width: "100%", padding: "0.625rem 1rem 0.625rem 2.5rem", borderRadius: "var(--radius-lg)", border: "1px solid hsl(var(--border))", background: "hsl(var(--muted) / 0.3)", fontSize: "0.875rem", outline: "none", color: "hsl(var(--foreground))" }} />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto" }}>
          {visibleConversations.length === 0 && (
            <div style={{ padding: "2rem", textAlign: "center", color: "hsl(var(--muted-foreground))", fontSize: "0.85rem" }}>
              Aucune conversation. Envoyez un message à l'admin pour commencer.
            </div>
          )}
          {visibleConversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => { setActiveConvId(conv.id); setMobileShowChat(true); }}
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
              <div style={{ width: "44px", height: "44px", borderRadius: "var(--radius-lg)", background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0, fontSize: "0.85rem" }}>
                {getInitials(conv.participantName)}
              </div>
              <div style={{ flex: 1, overflow: "hidden" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
                  <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>{conv.participantName}</span>
                  <span style={{ fontSize: "0.7rem", color: "hsl(var(--muted-foreground))" }}>{conv.time}</span>
                </div>
                <div style={{ fontSize: "0.8rem", color: conv.unread ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))", fontWeight: conv.unread ? 600 : 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {conv.lastMessage}
                </div>
              </div>
              {conv.unread && <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "hsl(var(--primary))", marginTop: "1.1rem", flexShrink: 0 }} />}
            </div>
          ))}
        </div>
      </aside>

      {/* Main Chat */}
      <main className="msg-main" style={{ flex: 1, display: "flex", flexDirection: "column", backgroundColor: "hsl(var(--background))" }}>
        {activeConv ? (
          <>
            <header style={{ padding: "1rem 1.5rem", background: "hsl(var(--card))", borderBottom: "1px solid hsl(var(--border) / 0.5)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <button className="msg-back" onClick={() => setMobileShowChat(false)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "hsl(var(--foreground))" }}>
                  <ArrowLeft size={20} />
                </button>
                <div style={{ width: "36px", height: "36px", borderRadius: "var(--radius)", background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.8rem" }}>
                  {getInitials(activeConv.participantName)}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{activeConv.participantName}</div>
                  <div style={{ fontSize: "0.72rem", color: "hsl(var(--success))", fontWeight: 600 }}>En ligne</div>
                </div>
              </div>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "hsl(var(--muted-foreground))" }}><Info size={18} /></button>
            </header>

            <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {activeConv.messages.map((msg) => {
                const me = isMyMessage(msg);
                return (
                  <div key={msg.id} style={{ display: "flex", justifyContent: me ? "flex-end" : "flex-start" }}>
                    <div style={{
                      maxWidth: "75%",
                      padding: "0.75rem 1rem",
                      borderRadius: me ? "1rem 1rem 4px 1rem" : "1rem 1rem 1rem 4px",
                      background: me ? "hsl(var(--primary))" : "hsl(var(--card))",
                      color: me ? "white" : "hsl(var(--foreground))",
                      boxShadow: me ? "0 4px 12px hsl(var(--primary) / 0.2)" : "var(--shadow-sm)",
                      border: me ? "none" : "1px solid hsl(var(--border) / 0.5)"
                    }}>
                      <div style={{ fontSize: "0.9rem", lineHeight: 1.5 }}>{msg.text}</div>
                      <div style={{ fontSize: "0.65rem", marginTop: "0.25rem", opacity: 0.7, textAlign: "right" }}>{msg.timestamp}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleSend} style={{ padding: "1rem 1.5rem", background: "hsl(var(--card))", borderTop: "1px solid hsl(var(--border) / 0.5)" }}>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <input
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  placeholder="Écrivez votre message..."
                  style={{ flex: 1, padding: "0.75rem 1rem", borderRadius: "var(--radius-lg)", border: "1px solid hsl(var(--border))", background: "hsl(var(--muted) / 0.3)", outline: "none", fontSize: "0.9rem", color: "hsl(var(--foreground))" }}
                />
                <button type="submit" style={{ width: "44px", height: "44px", borderRadius: "var(--radius-lg)", background: "hsl(var(--primary))", color: "white", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Send size={18} />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "hsl(var(--muted-foreground))" }}>
            <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "hsl(var(--muted) / 0.5)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
              <MessageSquare size={28} />
            </div>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "hsl(var(--foreground))", marginBottom: "0.5rem" }}>Vos messages</h2>
            <p style={{ fontSize: "0.9rem" }}>Sélectionnez une discussion ou envoyez un message à l'admin.</p>
            {!isAdmin && (
              <button
                onClick={() => {
                  const id = myEmail;
                  if (id) sendMessage("Bonjour, j'ai une question.", id);
                }}
                style={{ marginTop: "1.25rem", padding: "0.625rem 1.5rem", borderRadius: "var(--radius-full)", background: "hsl(var(--primary))", color: "white", border: "none", fontWeight: 700, cursor: "pointer", fontSize: "0.85rem" }}
              >
                Contacter l'admin
              </button>
            )}
          </div>
        )}
      </main>

      <style>{`
        @media (max-width: 768px) {
          .msg-sidebar { position: absolute; z-index: 50; width: 100%; height: 100%; transform: translateX(0); transition: transform 0.2s; }
          .msg-main { width: 100%; }
          .msg-back { display: flex !important; }
        }
      `}</style>
    </div>
  );
}

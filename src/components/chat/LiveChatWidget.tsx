'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  User,
  Headphones,
  CheckCircle2,
  Clock,
  Sparkles,
  Minimize2,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender_type: 'customer' | 'agent';
  sender_name: string;
  content: string;
  created_at: string;
}

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSession, setHasSession] = useState(false);
  const [visitorId, setVisitorId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [initialMessage, setInitialMessage] = useState('');

  // Active chat state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [ticketNumber, setTicketNumber] = useState<string | null>(null);
  const [assignedToName, setAssignedToName] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const crmApiUrl = process.env.NEXT_PUBLIC_CRM_API_URL || 'http://localhost:8080/api/v1';
  const crmWorkspaceId = process.env.NEXT_PUBLIC_CRM_WORKSPACE_ID || '0c700000-0000-0000-0000-000000000000';

  // 1. Initialize visitor identity from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let vid = localStorage.getItem('octo_webchat_vid');
    if (!vid) {
      vid = 'web-' + Math.random().toString(36).substring(2, 11) + '-' + Date.now();
      localStorage.setItem('octo_webchat_vid', vid);
    }
    setVisitorId(vid);

    const savedName = localStorage.getItem('octo_webchat_name') || '';
    const savedPhone = localStorage.getItem('octo_webchat_phone') || '';
    const savedEmail = localStorage.getItem('octo_webchat_email') || '';
    const sessionActive = localStorage.getItem('octo_webchat_active') === 'true';

    setName(savedName);
    setPhone(savedPhone);
    setEmail(savedEmail);
    setHasSession(sessionActive);

    // Listen to custom open chat event (from contact page button)
    const handleOpenChatEvent = () => setIsOpen(true);
    window.addEventListener('octo:open_chat', handleOpenChatEvent);

    return () => {
      window.removeEventListener('octo:open_chat', handleOpenChatEvent);
    };
  }, []);

  // 2. Poll messages when open and session is active
  useEffect(() => {
    if (!isOpen || !visitorId || !hasSession) return;

    const fetchHistory = async () => {
      try {
        const res = await fetch(
          `${crmApiUrl}/workspaces/${crmWorkspaceId}/inbox/webchat/messages?visitor_id=${encodeURIComponent(visitorId)}`
        );
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setMessages(json.data.messages || []);
            if (json.data.ticket_number) {
              setTicketNumber(json.data.ticket_number);
            }
            if (json.data.assigned_to_name) {
              setAssignedToName(json.data.assigned_to_name);
            }
          }
        }
      } catch (err) {
        // Silently ignore polling network errors
      }
    };

    fetchHistory();
    const interval = setInterval(fetchHistory, 3500);
    return () => clearInterval(interval);
  }, [isOpen, visitorId, hasSession, crmApiUrl, crmWorkspaceId]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // 3. Start chat session with initial intake
  const handleStartChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !initialMessage.trim()) return;

    try {
      setSending(true);
      const payload = {
        visitor_id: visitorId,
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        message: initialMessage.trim(),
      };

      const res = await fetch(`${crmApiUrl}/workspaces/${crmWorkspaceId}/inbox/webchat/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        // Persist session locally
        localStorage.setItem('octo_webchat_name', name.trim());
        localStorage.setItem('octo_webchat_phone', phone.trim());
        localStorage.setItem('octo_webchat_email', email.trim());
        localStorage.setItem('octo_webchat_active', 'true');
        setHasSession(true);

        // Append initial message
        setMessages([
          {
            id: 'init-' + Date.now(),
            sender_type: 'customer',
            sender_name: name.trim(),
            content: initialMessage.trim(),
            created_at: new Date().toISOString(),
          },
        ]);
        setInitialMessage('');
      } else {
        alert('Gagal mengirim pesan ke server. Silakan coba lagi.');
      }
    } catch (err) {
      alert('Kendala koneksi ke server. Pastikan jaringan stabil.');
    } finally {
      setSending(false);
    }
  };

  // 4. Send follow-up message in active conversation
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    const textToSend = newMessage.trim();
    setNewMessage('');

    // Optimistic UI update
    const optimisticMsg: ChatMessage = {
      id: 'opt-' + Date.now(),
      sender_type: 'customer',
      sender_name: name || 'Anda',
      content: textToSend,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimisticMsg]);

    try {
      setSending(true);
      await fetch(`${crmApiUrl}/workspaces/${crmWorkspaceId}/inbox/webchat/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          visitor_id: visitorId,
          name: name || 'Pengunjung Web',
          phone,
          email,
          message: textToSend,
        }),
      });
    } catch (err) {
      console.warn('Gagal mengirim pesan chat:', err);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[120] flex items-center gap-2.5 bg-[#00AFC4] hover:bg-[#0098AB] text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition duration-200 group cursor-pointer"
          aria-label="Buka Live Chat Bantuan"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
          </div>
          <span className="text-xs font-bold tracking-wide hidden sm:inline">
            Tanya Tim CS
          </span>
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[94vw] sm:w-[380px] h-[540px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden z-[120] animate-in fade-in slide-in-from-bottom-6 duration-200">
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-[#142740] to-[#1E3A5F] text-white flex items-center justify-between shrink-0 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-[#00AFC4] text-white flex items-center justify-center font-bold">
                  <Headphones className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#142740]" />
              </div>
              <div>
                <h3 className="text-sm font-bold flex items-center gap-1.5">
                  Live Support OCTO
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                    Online
                  </span>
                </h3>
                <p className="text-[11px] text-slate-300">
                  {assignedToName ? `Ditangani oleh: ${assignedToName}` : 'Departemen After-Sales (CS)'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
              title="Tutup Chat"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Ticket Info Banner (if ticket created) */}
          {ticketNumber && (
            <div className="px-4 py-2 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between text-[11px] text-emerald-800 shrink-0">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Tiket Bantuan Aktif: <strong>{ticketNumber}</strong>
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
                Diproses CS
              </span>
            </div>
          )}

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8FAFC]">
            {!hasSession ? (
              /* Initial Intake Form */
              <div className="space-y-4 py-2 animate-in fade-in">
                <div className="p-3.5 bg-[#E8F8FA] border border-cyan-200 rounded-2xl text-xs text-[#142740] space-y-1">
                  <p className="font-bold flex items-center gap-1.5 text-[#00AFC4]">
                    <Sparkles className="w-4 h-4" /> Halo! Ada yang bisa kami bantu?
                  </p>
                  <p className="text-[#586779] leading-relaxed text-[11px]">
                    Silakan isi info singkat di bawah. Pesan Anda akan langsung masuk sebagai tiket ke Customer Support kami.
                  </p>
                </div>

                <form onSubmit={handleStartChat} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nama Anda"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#00AFC4] focus:ring-1 focus:ring-[#00AFC4]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">WhatsApp</label>
                      <input
                        type="tel"
                        placeholder="08..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#00AFC4]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Email</label>
                      <input
                        type="email"
                        placeholder="email@anda.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#00AFC4]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Pertanyaan / Kendala *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Ceritakan apa yang bisa kami bantu..."
                      value={initialMessage}
                      onChange={(e) => setInitialMessage(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#00AFC4] focus:ring-1 focus:ring-[#00AFC4]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending || !name.trim() || !initialMessage.trim()}
                    className="w-full py-2.5 text-xs font-bold bg-[#00AFC4] hover:bg-[#0098AB] disabled:opacity-50 text-white rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{sending ? 'Menghubungkan...' : 'Mulai Chat dengan CS'}</span>
                  </button>
                </form>
              </div>
            ) : (
              /* Active Chat Stream */
              <div className="space-y-3">
                <div className="text-center py-1">
                  <span className="text-[10px] text-slate-400 bg-slate-200/60 px-2.5 py-0.5 rounded-full">
                    Percakapan Dimulai &bull; Terhubung ke After-Sales CS
                  </span>
                </div>

                {messages.length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-400">
                    Memuat riwayat obrolan...
                  </div>
                ) : (
                  messages.map((m) => {
                    const isCustomer = m.sender_type === 'customer';
                    return (
                      <div
                        key={m.id}
                        className={`flex flex-col ${isCustomer ? 'items-end' : 'items-start'}`}
                      >
                        <span className="text-[10px] text-slate-400 mb-1 px-1">
                          {isCustomer ? 'Anda' : m.sender_name || 'Customer Support'}
                        </span>
                        <div
                          className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-2xs ${
                            isCustomer
                              ? 'bg-[#00AFC4] text-white rounded-br-none'
                              : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{m.content}</p>
                          <span
                            className={`text-[9px] mt-1 block text-right ${
                              isCustomer ? 'text-cyan-100' : 'text-slate-400'
                            }`}
                          >
                            {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Footer Input Area (Only when session is active) */}
          {hasSession && (
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 flex items-center gap-2 shrink-0">
              <input
                type="text"
                placeholder="Ketik balasan Anda..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00AFC4] focus:ring-1 focus:ring-[#00AFC4]"
              />
              <button
                type="submit"
                disabled={sending || !newMessage.trim()}
                className="p-2.5 bg-[#00AFC4] hover:bg-[#0098AB] disabled:opacity-50 text-white rounded-xl shadow-xs transition cursor-pointer"
                title="Kirim pesan"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}

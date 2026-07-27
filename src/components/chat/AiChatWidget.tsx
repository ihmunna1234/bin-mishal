'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  PhoneCall,
  RotateCcw,
  CheckCircle2,
  Copy,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  disclaimer?: string;
  leadCreated?: {
    tracking_code: string;
    client_name: string;
    branch_name: string;
  } | null;
}

const quickChips = [
  {
    label: 'পাসপোর্ট তথ্য নবায়ন (মালুমাত) নিয়ম',
    category: 'Malumat',
    prompt: 'পাসপোর্ট নবায়নের পর আবশের ও জাওয়াজাতে তথ্য (মালুমাত) আপডেট করার নিয়ম কী?',
  },
  {
    label: 'উমরাহ প্যাকেজ ফি ও বিস্তারিত',
    category: 'Umrah',
    prompt: '২০২৬ সালের জন্য উমরাহ ভিসা প্যাকেজ, হোটেল ও নুশুক পারমিটের ফি ও বিস্তারিত দিন।',
  },
  {
    label: 'ইনভেস্টর লাইসেন্স (MISA) ও সিআর নিয়ম',
    category: 'MISA',
    prompt: 'সৌদি আরবে বিদেশি নাগরিক হিসেবে ১০০% মালিকানায় MISA কোম্পানি খোলার নিয়ম কী?',
  },
  {
    label: 'আমেকা / কফিল ট্রান্সফার আপডেট',
    category: 'Qiwa',
    prompt: 'কিওয়া (Qiwa) প্ল্যাটফর্মে কফিল ও আমেল ট্রান্সফারের বর্তমান নিয়ম ও ফি কী?',
  },
];

export default function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'assistant',
      text: 'আসসালামু আলাইকুম! বিন মিসাল ট্রাভেলস AI হেল্পডেস্কে আপনাকে স্বাগতম। পাসপোর্ট মালুমাত, উমরাহ ভিসা, বিমান টিকিট বা MISA লাইসেন্স সংক্রান্ত প্রশ্ন জিজ্ঞাসা করুন।',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      const data = await res.json();
      let replyText = data.reply || 'ধন্যবাদ। আপনার বিষয়ের জন্য আমাদের হটলাইনে ফোন দিন: +966 50 111 2233।';

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: replyText,
        disclaimer: data.disclaimer,
        leadCreated: data.leadCreated,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat API Error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: 'ধন্যবাদ। সরাসরি রিয়াদ বা দাম্মাম শাখায় যোগাযোগের জন্য হোয়াটসঅ্যাপে ক্লিক করুন।',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsTyping(false);
      if (!isOpen) {
        setUnreadCount((c) => c + 1);
      }
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-[#1e3a8a] via-[#2563eb] to-[#1d4ed8] text-white shadow-2xl hover:shadow-blue-500/50 border border-blue-400/40 transition-all duration-300 hover:scale-105 cursor-pointer"
          aria-label="Open AI Travel Assistant Chat"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-[#38bdf8] animate-pulse" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#38bdf8] text-slate-950 font-extrabold text-[10px] rounded-full flex items-center justify-center border-2 border-[#1e3a8a]">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-extrabold text-white">Saudi Travel AI Desk</p>
            <p className="text-[10px] text-sky-200">Ask in Bengali & English</p>
          </div>
        </button>
      )}

      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[420px] h-[560px] bg-white rounded-3xl shadow-2xl border border-blue-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1e3a8a] via-[#2563eb] to-[#1d4ed8] text-white p-4 flex items-center justify-between border-b border-blue-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 text-[#38bdf8] flex items-center justify-center border border-white/30">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-sm text-white">Bin Misal AI Desk</h3>
                  <span className="w-2 h-2 rounded-full bg-sky-300 animate-ping" />
                </div>
                <p className="text-[10px] text-sky-200">Saudi Legal & Travel Specialist</p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-sky-200">
              <a
                href="tel:+966501112233"
                title="Call Branch Hotline"
                className="p-1.5 hover:bg-[#1e40af] rounded-lg transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#38bdf8]" />
              </a>
              <button
                onClick={() =>
                  setMessages([
                    {
                      id: '1',
                      sender: 'assistant',
                      text: 'আসসালামু আলাইকুম! পাসপোর্ট মালুমাত, উমরাহ বা MISA লাইসেন্স সংক্রান্ত প্রশ্ন জিজ্ঞাসা করুন।',
                      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    },
                  ])
                }
                title="Reset Chat"
                className="p-1.5 hover:bg-[#1e40af] rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-[#1e40af] rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Action Chips Bar */}
          <div className="p-2.5 bg-slate-100 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip.prompt)}
                className="shrink-0 px-3.5 py-1 rounded-full bg-white hover:bg-blue-100 hover:text-[#2563eb] text-[11px] font-bold text-slate-700 border border-slate-200 shadow-2xs transition-colors whitespace-nowrap cursor-pointer"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-[#2563eb] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className="max-w-[85%] space-y-2">
                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#2563eb] text-white rounded-tr-none shadow-md font-bold'
                        : 'bg-white text-slate-800 rounded-tl-none border border-slate-200/80 shadow-sm whitespace-pre-line'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Auto-Created Lead Banner Card */}
                    {msg.leadCreated && (
                      <div className="mt-3 p-3 rounded-2xl bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-300 text-slate-900 shadow-inner">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-extrabold text-[#2563eb] uppercase tracking-wider flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#2563eb]" />
                            File Registered
                          </span>
                          <span className="text-[10px] text-slate-500 font-bold">
                            {msg.leadCreated.branch_name}
                          </span>
                        </div>

                        <div className="flex items-center justify-between bg-white px-3 py-1.5 rounded-xl border border-blue-200 mt-1">
                          <span className="font-mono font-extrabold text-sm text-[#1e3a8a]">
                            #{msg.leadCreated.tracking_code}
                          </span>
                          <button
                            onClick={() => copyToClipboard(msg.leadCreated!.tracking_code)}
                            className="text-[10px] text-[#2563eb] font-extrabold hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            {copiedCode === msg.leadCreated.tracking_code ? (
                              <span className="text-[#2563eb] font-bold">Copied!</span>
                            ) : (
                              <>
                                <Copy className="w-3 h-3 text-[#2563eb]" />
                                <span>Copy Code</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Soft Guardrail Disclaimer */}
                    {msg.disclaimer && (
                      <div className="mt-2 pt-2 border-t border-slate-200/60 text-[10px] text-slate-500 italic">
                        ⚠️ {msg.disclaimer}
                      </div>
                    )}

                    <span
                      className={`block text-[9px] mt-1 text-right ${
                        msg.sender === 'user' ? 'text-sky-200' : 'text-slate-400'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-200 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs italic pl-9">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#2563eb] rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-[#2563eb] rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-[#2563eb] rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
                <span>Searching vector store & routing query...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything in Bengali or English..."
              className="flex-1 px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2563eb] text-xs text-slate-900 font-semibold"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-2.5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white transition-colors cursor-pointer disabled:opacity-50"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

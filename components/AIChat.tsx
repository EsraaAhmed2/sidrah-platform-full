"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

import { getAllCourses } from "@/lib/courses-data";
import { useLang } from "@/context/LanguageContext";

export default function AIChat() {
  const { t } = useLang();

  const rules: { keys: string[]; response: () => string }[] = [
    {
      keys: ["سعر", "اسعار", "بكام", "تكلفة", "فلوس", "price", "cost"],
      response: () =>
        `${t("chat.r1a")} $${Math.min(...getAllCourses().map((c) => c.price))} - $${Math.max(...getAllCourses().map((c) => c.price))}. ${t("chat.r1b")}`,
    },
    {
      keys: ["كورس", "كورسات", "course", "اتعلم", "ابدأ", "بداية"],
      response: () =>
        `${getAllCourses().length} ${t("chat.r2")}`,
    },
    {
      keys: ["شهادة", "شهادات", "certificate", "معتمدة"],
      response: () => t("chat.r3"),
    },
    {
      keys: ["دفع", "فيزا", "فودافون", "كاش", "بطاقة", "payment", "استرداد", "فلوسي"],
      response: () => t("chat.r4"),
    },
    {
      keys: ["معلم", "محاضر", "instructor", "مدرس", "مين بيعلم"],
      response: () => t("chat.r5"),
    },
    {
      keys: ["مجاني", "free", "بلاش"],
      response: () => t("chat.r6"),
    },
    {
      keys: ["react", "ريأكت"],
      response: () => t("chat.r7"),
    },
    {
      keys: ["python", "بايثون", "بيثون"],
      response: () => t("chat.r8"),
    },
    {
      keys: ["وظيفة", "شغل", "سوق", "عمل", "job"],
      response: () => t("chat.r9"),
    },
    {
      keys: ["موبايل", "تطبيق", "flutter", "mobile"],
      response: () => t("chat.r10"),
    },
    {
      keys: ["مسار", "مسارات", "roadmap", "طريق"],
      response: () => t("chat.r11"),
    },
    {
      keys: ["وقت", "مدة", "قد إيه", "duration"],
      response: () => t("chat.r12"),
    },
    {
      keys: ["مشكلة", "خطأ", "مش شغال", "دعم", "support", "مساعدة"],
      response: () => t("chat.r13"),
    },
    {
      keys: ["مرحبا", "اهلا", "أهلا", "السلام", "hello", "hi", "هاي"],
      response: () => t("chat.r14"),
    },
    {
      keys: ["شكرا", "شكراً", "تسلم", "thanks"],
      response: () => t("chat.r15"),
    },
  ];

  const getBotResponse = (input: string): string => {
    const lower = input.toLowerCase();
    for (const rule of rules) {
      if (rule.keys.some((k) => lower.includes(k))) return rule.response();
    }
    return t("chat.default");
  };

  const quickReplies = [t("chat.q1"), t("chat.q2"), t("chat.q3"), t("chat.q4")];

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: t("chat.greeting"), sender: "bot", timestamp: new Date() },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg) return;

    const userMsg: Message = {
      id: messages.length + 1,
      text: msg,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: Message = {
        id: messages.length + 2,
        text: getBotResponse(msg),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-sidrah-600 hover:bg-sidrah-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 left-6 z-50 w-96 h-[500px] bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-sidrah-600 px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot size={18} className="text-white" />
            </div>
            <div>
              <h3 className="text-white font-medium text-sm">{t("chat.name")}</h3>
              <p className="text-white/70 text-xs">{t("chat.online")}</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.sender === "bot" ? "bg-sidrah-600" : "bg-gray-600"
                }`}>
                  {msg.sender === "bot" ? <Bot size={14} className="text-white" /> : <User size={14} className="text-white" />}
                </div>
                <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                  msg.sender === "bot"
                    ? "bg-[var(--bg-primary)] text-[var(--text-primary)] rounded-tr-2xl rounded-tl-none"
                    : "bg-sidrah-600 text-white rounded-tl-2xl rounded-tr-none"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-sidrah-600 flex items-center justify-center flex-shrink-0">
                  <Bot size={14} className="text-white" />
                </div>
                <div className="bg-[var(--bg-primary)] px-4 py-2 rounded-2xl rounded-tr-2xl rounded-tl-none">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-[var(--text-muted)] rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-[var(--text-muted)] rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></span>
                    <span className="w-2 h-2 bg-[var(--text-muted)] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 1 && (
            <div className="px-3 pb-2 flex flex-wrap gap-2">
              {quickReplies.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="text-xs bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-sidrah-500 hover:text-sidrah-400 px-3 py-1.5 rounded-full transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
          <div className="p-3 border-t border-[var(--border-color)]">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t("chat.placeholder")}
                className="flex-1 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-sidrah-500"
              />
              <button
                onClick={() => handleSend()}
                className="bg-sidrah-600 hover:bg-sidrah-700 text-white p-2 rounded-lg transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

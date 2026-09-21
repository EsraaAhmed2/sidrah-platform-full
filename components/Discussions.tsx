"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Send, MessageSquare, ThumbsUp } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

interface Comment {
  id: number;
  author: string;
  time: string;
  text: string;
  likes: number;
  replies: { id: number; author: string; time: string; text: string }[];
}

export default function Discussions() {
  const { t } = useLang();
  const instructor = t("discussions.instructor");
  const you = t("discussions.you");
  const now = t("discussions.now");

  const initialComments: Comment[] = [
    {
      id: 1,
      author: "أحمد خالد",
      time: "منذ ساعتين",
      text: "شرح رائع! هل يمكنك إضافة مثال عملي أكتر؟",
      likes: 12,
      replies: [
        { id: 11, author: instructor, time: "منذ ساعة", text: "شكراً أحمد! هضيف مثال في الدرس الجاي 👍" },
      ],
    },
    {
      id: 2,
      author: "محمد علي",
      time: "منذ 5 ساعات",
      text: "الدرس ممتاز جداً، شكراً للمعلم",
      likes: 8,
      replies: [],
    },
  ];

  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  const addComment = () => {
    if (!text.trim()) return;
    setComments((c) => [
      { id: Date.now(), author: you, time: now, text, likes: 0, replies: [] },
      ...c,
    ]);
    setText("");
    toast.success(t("discussions.postedToast"));
  };

  const addReply = (id: number) => {
    if (!replyText.trim()) return;
    setComments((c) =>
      c.map((cm) =>
        cm.id === id
          ? { ...cm, replies: [...cm.replies, { id: Date.now(), author: you, time: now, text: replyText }] }
          : cm
      )
    );
    setReplyTo(null);
    setReplyText("");
    toast.success(t("discussions.postedReplyToast"));
  };

  const toggleLike = (id: number) => {
    setLiked((l) => ({ ...l, [id]: !l[id] }));
    setComments((c) =>
      c.map((cm) => (cm.id === id ? { ...cm, likes: cm.likes + (liked[id] ? -1 : 1) } : cm))
    );
  };

  return (
    <div className="space-y-4">
      {/* Input */}
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sidrah-600 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
          {you[0]}
        </div>
        <div className="flex-1 flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addComment()}
            placeholder={t("discussions.commentPlaceholder")}
            className="input-field flex-1"
            aria-label={t("discussions.commentAria")}
          />
          <button onClick={addComment} className="btn-primary !px-4" aria-label={t("discussions.postComment")}>
            <Send size={16} />
          </button>
        </div>
      </div>

      {comments.map((c) => (
        <div key={c.id} className="space-y-3">
          <div className="flex gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 ${
              c.author === you ? "bg-gradient-to-br from-sidrah-600 to-purple-500" : "bg-sidrah-600"
            }`}>
              {c.author[0]}
            </div>
            <div className="bg-dark-800 rounded-xl p-4 flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium text-sm">{c.author}</span>
                <span className="text-gray-500 text-xs">{c.time}</span>
              </div>
              <p className="text-gray-300 text-sm mb-3">{c.text}</p>
              <div className="flex items-center gap-4 text-xs">
                <button
                  onClick={() => toggleLike(c.id)}
                  className={`flex items-center gap-1 ${liked[c.id] ? "text-sidrah-400" : "text-gray-500 hover:text-gray-300"}`}
                >
                  <ThumbsUp size={14} /> {c.likes}
                </button>
                <button
                  onClick={() => setReplyTo(replyTo === c.id ? null : c.id)}
                  className="flex items-center gap-1 text-gray-500 hover:text-gray-300"
                >
                  <MessageSquare size={14} /> {t("discussions.reply")}
                </button>
              </div>
              {replyTo === c.id && (
                <div className="flex gap-2 mt-3">
                  <input
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addReply(c.id)}
                    placeholder={t("discussions.replyPlaceholder")}
                    className="input-field !py-2 flex-1 text-sm"
                    autoFocus
                  />
                  <button onClick={() => addReply(c.id)} className="btn-primary !px-3 !py-2" aria-label={t("discussions.postReply")}>
                    <Send size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
          {c.replies.map((r) => (
            <div key={r.id} className="flex gap-4 mr-14">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${
                r.author === instructor ? "bg-green-600" : "bg-purple-600"
              }`}>
                {r.author[0]}
              </div>
              <div className="bg-dark-800/60 rounded-xl p-3 flex-1 border border-dark-700">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white text-sm font-medium">{r.author}</span>
                  {r.author === instructor && (
                    <span className="text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded">{t("discussions.instructorBadge")}</span>
                  )}
                  <span className="text-gray-500 text-xs">{r.time}</span>
                </div>
                <p className="text-gray-300 text-sm">{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

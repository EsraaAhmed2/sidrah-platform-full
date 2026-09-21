"use client";
import { useState } from "react";
import { Star, Send } from "lucide-react";
import { toast } from "sonner";
import { useLang } from "@/context/LanguageContext";

export default function ReviewForm({ onSubmit }: { onSubmit: (rating: number, comment: string) => void }) {
  const { t } = useLang();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const submit = () => {
    if (!rating) {
      toast.error(t("review.selectRating"));
      return;
    }
    if (comment.trim().length < 5) {
      toast.error(t("review.commentMin"));
      return;
    }
    onSubmit(rating, comment.trim());
    setRating(0);
    setComment("");
    toast.success(t("review.thanks"));
  };

  return (
    <div className="border-t border-dark-700 pt-6 mt-6">
      <h3 className="text-white font-medium mb-4">{t("review.addReview")}</h3>
      <div className="flex gap-1 mb-4" dir="ltr" role="radiogroup" aria-label={t("review.ratingAria")}>
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            role="radio"
            aria-checked={rating === s}
            aria-label={`${s} ${t("review.stars")}`}
            onMouseEnter={() => setHover(s)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(s)}
            className="transition-transform hover:scale-110"
          >
            <Star
              size={28}
              className={s <= (hover || rating) ? "text-yellow-400" : "text-gray-600"}
              fill={s <= (hover || rating) ? "currentColor" : "none"}
            />
          </button>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
        placeholder={t("review.commentPlaceholder")}
        className="input-field resize-none mb-3"
        aria-label={t("review.commentAria")}
      />
      <button onClick={submit} className="btn-primary !py-2 flex items-center gap-2">
        <Send size={16} /> {t("review.submit")}
      </button>
    </div>
  );
}

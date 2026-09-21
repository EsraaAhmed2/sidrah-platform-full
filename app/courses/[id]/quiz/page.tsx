"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Clock, Check, X, ArrowLeft, Trophy, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getCourseById } from "@/lib/courses-data";
import { saveQuizAttempt, getBestScore, getQuizHistory } from "@/lib/progress";
import { useLang } from "@/context/LanguageContext";

const TIME_PER_QUESTION = 20; // seconds

export default function QuizPage() {
  const { t } = useLang();
  const params = useParams();
  const courseId = Number(params.id);
  const courseData = getCourseById(courseId);

  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [isFinished, setIsFinished] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const questions = courseData?.questions || [];
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (showResult && !saved && questions.length > 0) {
      const sc = questions.filter((q, idx) => answers[idx] === q.correct).length;
      const pct = Math.round((sc / questions.length) * 100);
      saveQuizAttempt(courseId, {
        score: sc,
        total: questions.length,
        percentage: pct,
        date: new Date().toISOString(),
      });
      setSaved(true);
    }
  }, [showResult, saved]);

  useEffect(() => {
    if (isFinished || showResult) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNext();
          return TIME_PER_QUESTION;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentQ, isFinished, showResult]);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setAnswers((prev) => ({ ...prev, [currentQ]: index }));
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((prev) => prev + 1);
      setSelectedAnswer(answers[currentQ + 1] ?? null);
      setTimeLeft(TIME_PER_QUESTION);
    } else {
      setIsFinished(true);
      setShowResult(true);
      setSaved(false);
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) {
      setCurrentQ((prev) => prev - 1);
      setSelectedAnswer(answers[currentQ - 1] ?? null);
      setTimeLeft(TIME_PER_QUESTION);
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correct) score++;
    });
    return score;
  };

  const score = calculateScore();
  const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  const getResultMessage = () => {
    if (percentage >= 80) return { text: t("quiz.excellent"), color: "text-green-400" };
    if (percentage >= 60) return { text: t("quiz.good"), color: "text-yellow-400" };
    return { text: t("quiz.tryAgain"), color: "text-red-400" };
  };

  if (!courseData) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] py-12 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4">{t("course.notFound")}</h1>
          <Link href="/courses" className="btn-primary">{t("course.backToCourses")}</Link>
        </div>
      </div>
    );
  }

  if (showResult) {
    const result = getResultMessage();
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="card text-center">
            <div className="w-20 h-20 bg-sidrah-950/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-sidrah-400" />
            </div>
            <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">{t("quiz.courseQuizTitle")}</h1>
            <p className="text-[var(--text-secondary)] mb-6">{courseData.title}</p>

            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="text-6xl font-bold text-[var(--text-primary)] mb-2"
            >
              {percentage}%
            </motion.div>
            <p className={`text-lg font-medium mb-6 ${result.color}`}>{result.text}</p>

            {(() => {
              const history = getQuizHistory(courseId);
              const best = getBestScore(courseId);
              return history.length > 1 ? (
                <p className="text-[var(--text-muted)] text-sm mb-4">
                  {t("quiz.attempt")} {history.length} • {t("quiz.bestScore")}: {best}%
                </p>
              ) : null;
            })()}

            <div className="bg-[var(--bg-primary)] rounded-xl p-4 mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[var(--text-secondary)]">{t("quiz.correctAnswers")}</span>
                <span className="text-green-400 font-medium">{score} / {questions.length}</span>
              </div>
              <div className="w-full bg-[var(--bg-secondary)] rounded-full h-3">
                <div className="bg-sidrah-500 h-3 rounded-full transition-all" style={{ width: `${percentage}%` }}></div>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              {questions.map((q, idx) => (
                <div key={q.id} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-primary)]">
                  {answers[idx] === q.correct ? (
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  ) : (
                    <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                  )}
                  <span className="text-[var(--text-primary)] text-sm text-right flex-1">{q.question}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3 justify-center">
              <button onClick={() => { setCurrentQ(0); setAnswers({}); setSelectedAnswer(null); setIsFinished(false); setShowResult(false); setTimeLeft(TIME_PER_QUESTION); }} className="btn-secondary flex items-center gap-2">
                <RotateCcw size={18} />
                {t("quiz.retry")}
              </button>
              <Link href={`/courses/${courseId}/certificate`} className="btn-primary flex items-center gap-2">
                <Trophy size={18} />
                {t("quiz.getCertificate")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">{t("quiz.courseQuizTitle")}</h1>
            <p className="text-[var(--text-secondary)] text-sm">{courseData.title}</p>
          </div>
          <div className="flex items-center gap-2 bg-sidrah-950/50 px-4 py-2 rounded-lg">
            <Clock className={`w-5 h-5 ${timeLeft <= 5 ? "text-red-400" : "text-sidrah-400"}`} />
            <motion.span
              key={timeLeft}
              initial={timeLeft <= 5 ? { scale: 1.3 } : false}
              animate={{ scale: 1 }}
              className={`text-lg font-bold ${timeLeft <= 5 ? "text-red-400" : "text-sidrah-400"}`}
            >
              {timeLeft}s
            </motion.span>
          </div>
        </div>

        {/* Progress */}
        <div className="w-full bg-[var(--bg-secondary)] rounded-full h-2 mb-8">
          <div className="bg-sidrah-500 h-2 rounded-full transition-all" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}></div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.25 }}
            className="card mb-6"
          >
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-sidrah-600 text-white text-sm px-3 py-1 rounded-full">{t("quiz.question")} {currentQ + 1} / {questions.length}</span>
          </div>
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">{q.question}</h2>

          <div className="space-y-3">
            {q.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={`w-full text-right p-4 rounded-xl border-2 transition-all ${
                  selectedAnswer === idx
                    ? "border-sidrah-500 bg-sidrah-950/30 scale-[1.01]"
                    : "border-[var(--border-color)] hover:border-sidrah-700 bg-[var(--bg-primary)]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                    selectedAnswer === idx ? "bg-sidrah-600 text-white" : "bg-[var(--bg-secondary)] text-[var(--text-secondary)]"
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="text-[var(--text-primary)]">{option}</span>
                </div>
              </button>
            ))}
          </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentQ === 0}
            className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft size={18} />
            {t("quiz.previous")}
          </button>
          <button
            onClick={handleNext}
            className="btn-primary flex items-center gap-2"
          >
            {currentQ === questions.length - 1 ? t("quiz.finish") : t("quiz.next")}
            <ArrowLeft size={18} className="rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
}

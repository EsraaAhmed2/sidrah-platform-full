"use client";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Star, Users, Clock, BookOpen, Check, Play, Heart } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Gift, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import VideoPlayer from "@/components/VideoPlayer";
import PaymentModal from "@/components/PaymentModal";
import Breadcrumbs from "@/components/Breadcrumbs";
import CourseCover from "@/components/CourseCover";
import CourseCard from "@/components/CourseCard";
import ReviewForm from "@/components/ReviewForm";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { getCourseById, getAllCourses } from "@/lib/courses-data";
import { useLang } from "@/context/LanguageContext";

const sampleReviews = [
  { name: "أحمد خالد", rating: 5, date: "قبل أسبوع", comment: "كورس ممتاز! الشرح واضح والأمثلة العملية مفيدة جداً." },
  { name: "سارة أحمد", rating: 5, date: "قبل أسبوعين", comment: "أفضل كورس اتعلمت منه. المعلم بيجاوب على كل الأسئلة." },
  { name: "محمد علي", rating: 4, date: "قبل شهر", comment: "محتوى قوي جداً، بس كنت أتمنى مزيد من المشاريع العملية." },
  { name: "نورا سامي", rating: 5, date: "قبل شهرين", comment: "غير طريقة تفكيري في البرمجة. أنصح به بشدة!" },
];

const ratingDistribution = [
  { stars: 5, percent: 78 },
  { stars: 4, percent: 15 },
  { stars: 3, percent: 5 },
  { stars: 2, percent: 1 },
  { stars: 1, percent: 1 },
];

export default function CourseDetailsPage() {
  const { t } = useLang();
  const params = useParams();
  const courseId = Number(params.id);
  const courseData = getCourseById(courseId);
  const [showPayment, setShowPayment] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  const tabs = [
    { id: "overview", label: t("course.tabOverview") },
    { id: "curriculum", label: t("course.tabCurriculum") },
    { id: "reviews", label: t("course.tabReviews") },
    { id: "instructor", label: t("course.tabInstructor") },
  ] as const;

  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>("overview");
  const [wishlisted, setWishlisted] = useState(false);
  const { add: addToCart, has: inCart } = useCart();
  const [reviews, setReviews] = useState(sampleReviews);

  function Stars({ value, size = 16 }: { value: number; size?: number }) {
    return (
      <div className="flex gap-0.5" dir="ltr" aria-label={`${t("course.rating")} ${value} ${t("course.outOf5")}`}>
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            size={size}
            className={s <= Math.round(value) ? "text-yellow-400" : "text-gray-600"}
            fill={s <= Math.round(value) ? "currentColor" : "none"}
          />
        ))}
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="min-h-screen bg-dark-900 py-12 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">{t("course.notFound")}</h1>
          <Link href="/courses" className="btn-primary">{t("course.backToCourses")}</Link>
        </div>
      </div>
    );
  }

  const toggleWishlist = () => {
    setWishlisted(!wishlisted);
    toast.success(wishlisted ? t("course.wishlistRemoved") : t("course.wishlistAdded"));
  };

  return (
    <div className="min-h-screen bg-dark-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: t("courses.breadcrumb"), href: "/courses" },
            { label: courseData.category },
            { label: courseData.title },
          ]}
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className={`bg-gradient-to-br ${courseData.gradientFrom} ${courseData.gradientTo} rounded-2xl p-8 border border-sidrah-800/30 mb-8`}>
              <div className="mb-6 rounded-xl overflow-hidden relative group">
                <CourseCover color={courseData.color} title={courseData.title} emoji={courseData.emoji} className="h-56" />
                <button
                  onClick={() => setShowTrailer(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label={t("course.watchTrailer")}
                >
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                    <Play size={24} className="text-dark-900 mr-1" />
                  </div>
                </button>
                <button
                  onClick={() => setShowTrailer(true)}
                  className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-2"
                >
                  <Play size={13} /> {t("course.watchTrailer")}
                </button>
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">{courseData.title}</h1>
              <p className="text-gray-300 leading-relaxed mb-6">{courseData.description}</p>
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2 text-yellow-400">
                  <Star size={18} fill="currentColor" />
                  <span className="font-semibold">{courseData.rating}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Users size={18} />
                  <span>{courseData.students} {t("course.student")}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock size={18} />
                  <span>{courseData.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <BookOpen size={18} />
                  <span>{courseData.lessonsCount} {t("course.lesson")}</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-dark-700 mb-6 overflow-x-auto" role="tablist">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id ? "text-sidrah-400" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.span
                      layoutId="course-tab"
                      className="absolute bottom-0 right-0 left-0 h-0.5 bg-sidrah-500"
                    />
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "overview" && (
                  <div className="space-y-6">
                  <div className="card">
                    <h2 className="text-xl font-bold text-white mb-4">{t("course.whatYouWillLearn")}</h2>
                    <div className="grid md:grid-cols-2 gap-3">
                      {courseData.topics.map((topic, i) => (
                        <div key={i} className="flex items-center gap-3 text-gray-300">
                          <Check size={18} className="text-sidrah-400 flex-shrink-0" />
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="card">
                    <h2 className="text-xl font-bold text-white mb-4">{t("course.projectsTitle")}</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { title: t("course.project1Title"), desc: t("course.project1Desc") },
                        { title: t("course.project2Title"), desc: t("course.project2Desc") },
                        { title: t("course.project3Title"), desc: t("course.project3Desc") },
                        { title: t("course.project4Title"), desc: t("course.project4Desc") },
                      ].map((p, i) => (
                        <div key={i} className="p-4 rounded-lg bg-dark-700/50 border border-dark-700">
                          <h3 className="text-white font-medium text-sm mb-1">{p.title}</h3>
                          <p className="text-gray-500 text-xs">{p.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  </div>
                )}

                {activeTab === "curriculum" && (
                  <div className="card">
                    <h2 className="text-xl font-bold text-white mb-6">{t("course.curriculumTitle")}</h2>
                    {(() => {
                      const sectionSize = Math.ceil(courseData.lessons.length / 3);
                      const sectionNames = [t("course.section.basic"), t("course.section.intermediate"), t("course.section.advanced")];
                      const sections = sectionNames.map((name, si) => ({
                        name,
                        lessons: courseData.lessons.slice(si * sectionSize, (si + 1) * sectionSize),
                        startIdx: si * sectionSize,
                      })).filter((s) => s.lessons.length > 0);
                      return (
                        <Accordion.Root type="multiple" defaultValue={["s-0"]} className="space-y-3">
                          {sections.map((section, si) => (
                            <Accordion.Item key={si} value={`s-${si}`} className="rounded-xl border border-dark-700 overflow-hidden">
                              <Accordion.Header>
                                <Accordion.Trigger className="w-full flex items-center justify-between px-5 py-4 text-right text-white font-medium hover:bg-dark-700/50 transition-colors group">
                                  <div className="flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-sidrah-950/50 text-sidrah-400 flex items-center justify-center text-sm font-bold">
                                      {si + 1}
                                    </span>
                                    <div>
                                      <span className="block">{section.name}</span>
                                      <span className="text-gray-500 text-xs font-normal">{section.lessons.length} {t("course.lesson")}</span>
                                    </div>
                                  </div>
                                  <ChevronDown size={18} className="text-gray-500 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                                </Accordion.Trigger>
                              </Accordion.Header>
                              <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                                <div className="px-3 pb-3 space-y-2">
                                  {section.lessons.map((lesson, li) => (
                                    <Link
                                      key={lesson.id}
                                      href={`/courses/${courseData.id}/lesson/${lesson.id}`}
                                      className="flex items-center justify-between p-3 rounded-lg bg-dark-700/50 hover:bg-dark-700 transition-colors group/lesson"
                                    >
                                      <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold ${
                                          lesson.completed ? "bg-sidrah-600 text-white" : "bg-dark-600 text-sidrah-400"
                                        }`}>
                                          {lesson.completed ? <Check size={14} /> : section.startIdx + li + 1}
                                        </div>
                                        <div>
                                          <h4 className="text-white text-sm font-medium group-hover/lesson:text-sidrah-300 transition-colors">
                                            {lesson.title}
                                          </h4>
                                          <span className="text-gray-500 text-xs">{lesson.duration}</span>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        {lesson.free && (
                                          <span className="text-xs bg-sidrah-950/50 text-sidrah-300 px-2 py-0.5 rounded">{t("course.free")}</span>
                                        )}
                                        <Play size={16} className="text-gray-500 group-hover/lesson:text-sidrah-400" />
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </Accordion.Content>
                            </Accordion.Item>
                          ))}
                        </Accordion.Root>
                      );
                    })()}
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="card">
                    <div className="flex flex-col md:flex-row gap-8 mb-8">
                      <div className="text-center md:w-48 flex-shrink-0">
                        <div className="text-5xl font-bold text-white mb-2">{courseData.rating}</div>
                        <Stars value={courseData.rating} size={20} />
                        <p className="text-gray-400 text-sm mt-2">{t("course.ratingLabel")}</p>
                      </div>
                      <div className="flex-1 space-y-2">
                        {ratingDistribution.map((r) => (
                          <div key={r.stars} className="flex items-center gap-3 text-sm">
                            <span className="text-gray-400 w-8 flex items-center gap-1">
                              {r.stars} <Star size={12} className="text-yellow-400" fill="currentColor" />
                            </span>
                            <div className="flex-1 h-2 bg-dark-700 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-yellow-400 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${r.percent}%` }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                              />
                            </div>
                            <span className="text-gray-500 w-10 text-left">{r.percent}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4 border-t border-dark-700 pt-6">
                      {reviews.map((review, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sidrah-600 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                            {review.name[0]}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-white font-medium text-sm">{review.name}</span>
                              <span className="text-gray-500 text-xs">{review.date}</span>
                            </div>
                            <Stars value={review.rating} size={14} />
                            <p className="text-gray-300 text-sm mt-2">{review.comment}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <ReviewForm
                      onSubmit={(rating, comment) =>
                        setReviews((r) => [
                          { name: t("discussions.you"), rating, date: t("discussions.now"), comment },
                          ...r,
                        ])
                      }
                    />
                  </div>
                )}

                {activeTab === "instructor" && (
                  <div className="card">
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sidrah-600 to-purple-500 flex items-center justify-center text-white font-bold text-3xl flex-shrink-0">
                        {courseData.instructor[0]}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{courseData.instructor}</h3>
                        <p className="text-sidrah-400 text-sm mb-3">{t("course.instructorLabel")} - {courseData.category}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1"><Star size={14} className="text-yellow-400" /> {courseData.rating} {t("course.rating")}</span>
                          <span className="flex items-center gap-1"><Users size={14} /> {courseData.students} {t("course.student")}</span>
                          <span className="flex items-center gap-1"><BookOpen size={14} /> {courseData.lessonsCount} {t("course.lesson")}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mt-4 border-t border-dark-700 pt-4">
                      {t("course.instructorBio1")} {courseData.category} {t("course.instructorBio2")}
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <div className="text-3xl font-bold text-white mb-2">${courseData.price}</div>
              <p className="text-gray-400 text-sm mb-6">{t("course.fullPriceLabel")}</p>
              <button onClick={() => setShowPayment(true)} className="w-full btn-primary mb-3">{t("course.enrollNow")}</button>
              <button
                onClick={() => addToCart(courseData.id)}
                className={`w-full mb-3 flex items-center justify-center gap-2 rounded-lg font-medium px-6 py-3 transition-all border ${
                  inCart(courseData.id)
                    ? "bg-green-500/10 text-green-400 border-green-500/40"
                    : "btn-secondary"
                }`}
              >
                <ShoppingCart size={18} />
                {inCart(courseData.id) ? t("course.inCart") : t("course.addToCart")}
              </button>
              <button
                onClick={() => {
                  const giftLink = `${window.location.origin}/courses/${courseData.id}?gift=true`;
                  navigator.clipboard.writeText(giftLink);
                  toast.success(t("course.giftLinkCopied"));
                }}
                className="w-full btn-secondary mb-3 flex items-center justify-center gap-2"
              >
                <Gift size={18} /> {t("course.giftCourse")}
              </button>
              <button
                onClick={toggleWishlist}
                className={`w-full btn-secondary mb-6 flex items-center justify-center gap-2 ${
                  wishlisted ? "border-red-500/50 text-red-400" : ""
                }`}
              >
                <Heart size={18} fill={wishlisted ? "currentColor" : "none"} />
                {wishlisted ? t("course.inWishlist") : t("course.addToWishlist")}
              </button>
              <div className="space-y-3 text-sm border-t border-dark-700 pt-4">
                <div className="flex justify-between text-gray-400">
                  <span>{t("course.instructor")}</span>
                  <span className="text-white">{courseData.instructor}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>{t("course.duration")}</span>
                  <span className="text-white">{courseData.duration}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>{t("course.lessonsCount")}</span>
                  <span className="text-white">{courseData.lessonsCount}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>{t("course.students")}</span>
                  <span className="text-white">{courseData.students}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Courses */}
        <div className="mt-16">
          <h2 className="text-xl font-bold text-white mb-6">{t("course.relatedCourses")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getAllCourses()
              .filter((c) => c.id !== courseData.id && c.category === courseData.category)
              .concat(getAllCourses().filter((c) => c.id !== courseData.id && c.category !== courseData.category))
              .slice(0, 3)
              .map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      <AnimatePresence>
        {showTrailer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setShowTrailer(false)}
            role="dialog"
            aria-modal="true"
            aria-label={t("course.trailerModalLabel")}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="w-full max-w-3xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowTrailer(false)}
                className="absolute -top-10 left-0 text-white/80 hover:text-white"
                aria-label={t("common.close")}
              >
                <X size={24} />
              </button>
              <VideoPlayer title={`${t("course.trailer")}: ${courseData.title}`} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        courseTitle={courseData.title}
        price={courseData.price}
      />
    </div>
  );
}

import Link from "next/link";
import { ArrowLeft, Play, Star, Users, BookOpen, Award, Sparkles } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import { getAllCourses } from "@/lib/courses-data";
import { FadeIn, ScrollReveal, StaggerContainer, StaggerItem } from "@/components/Motion";
import CountUp from "@/components/CountUp";
import NewsletterForm from "@/components/NewsletterForm";
import T from "@/components/T";

const stats = [
  { icon: Users, value: 15000, suffix: "+", label: "stats.students" },
  { icon: BookOpen, value: 120, suffix: "+", label: "stats.courses" },
  { icon: Award, value: 50, suffix: "+", label: "stats.instructors" },
  { icon: Star, value: 4.9, suffix: "", label: "stats.rating", decimal: true },
];

export default function LandingPage() {
  const featuredCourses = getAllCourses().slice(0, 6);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-dark-900 pt-20 pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sidrah-950/40 via-dark-900 to-dark-900"></div>
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-sidrah-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -left-32 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
          <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <FadeIn>
                <div className="inline-flex items-center gap-2 bg-sidrah-950/50 border border-sidrah-800/50 rounded-full px-4 py-1.5 mb-6">
                  <Sparkles size={14} className="text-sidrah-400" />
                  <span className="text-sidrah-300 text-sm"><T k="hero.badge" /></span>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  <T k="hero.title1" />
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sidrah-400 via-cyan-300 to-purple-400 animate-gradient">
                    <T k="hero.title2" />
                  </span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-lg">
                  <T k="hero.subtitle" />
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="flex flex-wrap gap-4">
                  <Link href="/courses" className="btn-primary inline-flex items-center gap-2">
                    <T k="hero.start" />
                    <ArrowLeft size={18} />
                  </Link>
                  <Link href="/courses/1" className="btn-secondary inline-flex items-center gap-2">
                    <Play size={18} />
                    <T k="hero.watch" />
                  </Link>
                </div>
              </FadeIn>
              <FadeIn delay={0.4}>
                <div className="flex items-center gap-6 mt-10 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2 space-x-reverse">
                      {["أ", "م", "س", "ن"].map((c, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-sidrah-600 to-purple-500 border-2 border-dark-900 flex items-center justify-center text-white text-xs font-bold"
                        >
                          {c}
                        </div>
                      ))}
                    </div>
                    <span><T k="hero.learners" /></span>
                  </div>
                </div>
              </FadeIn>
            </div>
            <FadeIn delay={0.3} className="relative">
              {/* Platform mockup instead of static code */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-sidrah-600/30 to-purple-600/30 rounded-3xl blur-2xl"></div>
                <div className="relative bg-dark-800 rounded-2xl border border-dark-700 shadow-2xl overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-dark-700 bg-dark-900/50">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-gray-500 text-xs mr-2">sidrah.com/dashboard</span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="h-3 w-24 bg-dark-600 rounded mb-2"></div>
                        <div className="h-2 w-32 bg-dark-700 rounded"></div>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sidrah-500 to-purple-500"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="bg-dark-700/50 rounded-lg p-3">
                          <div className={`h-8 w-8 rounded-lg mb-2 bg-gradient-to-br ${
                            i === 0 ? "from-blue-500 to-cyan-400" : i === 1 ? "from-yellow-500 to-green-400" : "from-purple-500 to-pink-400"
                          }`}></div>
                          <div className="h-2 w-full bg-dark-600 rounded mb-1"></div>
                          <div className="h-2 w-2/3 bg-dark-600 rounded"></div>
                          <div className="mt-2 h-1.5 w-full bg-dark-600 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-sidrah-500 rounded-full"
                              style={{ width: `${[65, 30, 80][i]}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-dark-700/50 rounded-lg p-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-sidrah-600/30 flex items-center justify-center">
                        <Play size={16} className="text-sidrah-400" />
                      </div>
                      <div className="flex-1">
                        <div className="h-2.5 w-3/4 bg-dark-600 rounded mb-1.5"></div>
                        <div className="h-2 w-1/2 bg-dark-600 rounded"></div>
                      </div>
                      <span className="text-sidrah-400 text-xs font-medium">65%</span>
                    </div>
                  </div>
                </div>
                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-dark-800 border border-dark-600 rounded-xl px-3 py-2 shadow-xl animate-bounce" style={{ animationDuration: "3s" }}>
                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-yellow-400" />
                    <span className="text-white text-xs font-medium"><T k="hero.cert" /></span>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-dark-800 border border-dark-600 rounded-xl px-3 py-2 shadow-xl animate-bounce" style={{ animationDuration: "3s", animationDelay: "1.5s" }}>
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-yellow-400" fill="currentColor" />
                    <span className="text-white text-xs font-medium">4.9 تقييم</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-dark-800 border-y border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <StaggerItem key={idx} className="text-center">
                <stat.icon className="w-8 h-8 text-sidrah-500 mx-auto mb-3" />
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.decimal ? stat.value : <CountUp to={stat.value} suffix={stat.suffix} />}
                </div>
                <div className="text-gray-400 text-sm"><T k={stat.label} /></div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4"><T k="landing.topCourses" /></h2>
            <p className="text-gray-400"><T k="landing.topCoursesSub" /></p>
          </ScrollReveal>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <StaggerItem key={course.id}>
                <CourseCard course={course} />
              </StaggerItem>
            ))}
          </StaggerContainer>
          <ScrollReveal className="text-center mt-10">
            <Link href="/courses" className="btn-secondary inline-flex items-center gap-2">
              <T k="landing.exploreAll" />
              <ArrowLeft size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-dark-900 border-t border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4"><T k="landing.testimonials" /></h2>
            <p className="text-gray-400"><T k="landing.testimonialsSub" /></p>
          </ScrollReveal>
          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {[
              { name: "أحمد خالد", role: "Front-End Developer", text: "بدأت من الصفر تماماً وخلال 6 شهور حصلت على أول وظيفة لي. الكورسات عملية ومبنية على مشاريع حقيقية.", rating: 5 },
              { name: "سارة أحمد", role: "Full Stack Developer", text: "أفضل استثمار عملته في نفسي. المعلمين بيجاوبوا على كل سؤال والمجتمع داعم جداً.", rating: 5 },
              { name: "محمد علي", role: "Backend Engineer", text: "الاختبارات والشهادات خلتني أثبت مستواي لأصحاب العمل. شكراً سدرة على المنصة الرائعة!", rating: 5 },
            ].map((t, i) => (
              <StaggerItem key={i} className="card">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={16} className="text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sidrah-600 to-purple-500 flex items-center justify-center text-white font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-dark-800">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4"><T k="landing.cta" /></h2>
            <p className="text-gray-400 mb-8"><T k="landing.ctaSub" /></p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/register" className="btn-primary inline-flex items-center gap-2">
                <T k="landing.ctaBtn" />
                <ArrowLeft size={18} />
              </Link>
              <Link href="/paths" className="btn-secondary inline-flex items-center gap-2">
                <T k="landing.explorePaths" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-dark-900 border-t border-dark-800">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">📬 <T k="landing.newsletter" /></h2>
            <p className="text-gray-400 mb-8"><T k="landing.newsletterSub" /></p>
            <NewsletterForm />
            <p className="text-gray-600 text-xs mt-4">بالاشتراك أنت توافق على <Link href="/privacy" className="underline">سياسة الخصوصية</Link></p>
          </div>
        </ScrollReveal>
      </section>

      {/* Features */}
      <section className="py-20 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4"><T k="landing.why" /></h2>
          </ScrollReveal>
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {[
              { title: "تعلم تفاعلي", desc: "فيديوهات عالية الجودة مع تمارين عملية", icon: Play },
              { title: "معلمين خبراء", desc: "نخبة من أفضل المبرمجين والمعلمين", icon: Users },
              { title: "شهادات معتمدة", desc: "احصل على شهادة إتمام مع كل كورس", icon: Award },
            ].map((f, i) => (
              <StaggerItem key={i} className="card text-center hover:border-sidrah-700 transition-colors">
                <div className="w-14 h-14 bg-sidrah-950/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <f.icon className="w-7 h-7 text-sidrah-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}

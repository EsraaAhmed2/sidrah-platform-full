"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Bell, Search, Sun, Moon, ShoppingCart, User, Settings, LogOut, LayoutDashboard, Languages, BookOpen, GraduationCap, Upload, ShieldCheck } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useLang } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", key: "nav.home" },
  { href: "/courses", key: "nav.courses" },
  { href: "/paths", key: "nav.paths" },
  { href: "/blog", key: "nav.blog" },
  { href: "/leaderboard", key: "nav.leaderboard" },
  { href: "/contact", key: "nav.contact" },
];

const notifications = [
  { id: 1, text: "تم إضافة درس جديد في كورس React.js", time: "منذ 10 دقائق", unread: true },
  { id: 2, text: "تهانينا! حصلت على شارة المتعلم المجتهد", time: "منذ ساعة", unread: true },
  { id: 3, text: "خصم 30% على كورس Full Stack", time: "أمس", unread: false },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { count: cartCount } = useCart();
  const { user, isLoggedIn, logout } = useAuth();
  const { lang, setLang, t } = useLang();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setNotifOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      className={`bg-[var(--bg-primary)]/95 backdrop-blur-md border-b border-[var(--border-color)] sticky top-0 z-50 transition-all ${
        scrolled ? "shadow-lg shadow-black/10" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2" aria-label="Sidrah - الرئيسية">
            <Image src="/logo-icon.jpg" alt="Sidrah" width={36} height={36} className="rounded-lg" />
            <span className="text-xl font-bold text-[var(--text-primary)]">SIDRAH</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-sidrah-400"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {t(link.key)}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 right-4 left-4 h-0.5 bg-sidrah-500 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1 text-xs font-bold"
              aria-label="تغيير اللغة / Switch language"
            >
              <Languages size={18} />
              {lang === "ar" ? "EN" : "ع"}
            </button>
            <button
              onClick={toggleTheme}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              aria-label={theme === "dark" ? "تفعيل الوضع النهاري" : "تفعيل الوضع الليلي"}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link
              href="/search"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              aria-label="بحث"
            >
              <Search size={20} />
            </Link>
            <Link
              href="/cart"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] relative"
              aria-label="سلة المشتريات"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -left-1.5 w-4 h-4 bg-sidrah-500 text-white text-[10px] rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] relative"
                aria-label="الإشعارات"
                aria-expanded={notifOpen}
              >
                <Bell size={20} />
                <span className="absolute -top-1 -left-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 mt-3 w-80 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl shadow-2xl overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-[var(--border-color)] flex items-center justify-between">
                      <h3 className="text-[var(--text-primary)] font-medium text-sm">الإشعارات</h3>
                      <Link href="/notifications" className="text-sidrah-400 text-xs hover:text-sidrah-300">
                        عرض الكل
                      </Link>
                    </div>
                    <div>
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`px-4 py-3 border-b border-[var(--border-color)]/50 hover:bg-[var(--bg-primary)] transition-colors cursor-pointer ${
                            n.unread ? "bg-sidrah-950/20" : ""
                          }`}
                        >
                          <p className="text-[var(--text-primary)] text-sm">{n.text}</p>
                          <p className="text-[var(--text-muted)] text-xs mt-1">{n.time}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-sidrah-600 to-purple-500 flex items-center justify-center text-white font-bold text-sm hover:ring-2 ring-sidrah-500/50 transition-all"
                  aria-label="قائمة المستخدم"
                  aria-expanded={userMenuOpen}
                >
                  {user?.name?.[0] || "م"}
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 mt-3 w-56 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl shadow-2xl overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-[var(--border-color)]">
                        <div className="flex items-center justify-between">
                          <p className="text-[var(--text-primary)] font-medium text-sm">{user?.name}</p>
                          {user?.role && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-sidrah-600/20 text-sidrah-400 font-medium">{t(`nav.role.${user.role}`)}</span>
                          )}
                        </div>
                        <p className="text-[var(--text-muted)] text-xs">{user?.email}</p>
                      </div>
                      {[
                        { href: "/dashboard", label: t("nav.menu.dashboard"), icon: LayoutDashboard },
                        ...(user?.role === "student"
                          ? [{ href: "/my-courses", label: t("nav.menu.myCourses"), icon: BookOpen }]
                          : []),
                        ...(user?.role === "teacher" || user?.role === "admin"
                          ? [
                              { href: "/teacher", label: t("nav.menu.teacher"), icon: GraduationCap },
                              { href: "/teacher/upload", label: t("nav.menu.upload"), icon: Upload },
                            ]
                          : []),
                        ...(user?.role === "admin"
                          ? [{ href: "/admin", label: t("nav.menu.admin"), icon: ShieldCheck }]
                          : []),
                        { href: "/profile", label: t("nav.menu.profile"), icon: User },
                        { href: "/settings", label: t("nav.menu.settings"), icon: Settings },
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)] transition-colors"
                        >
                          <item.icon size={16} /> {item.label}
                        </Link>
                      ))}
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-[var(--bg-primary)] transition-colors border-t border-[var(--border-color)]"
                      >
                        <LogOut size={16} /> {t("nav.menu.logout")}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm font-medium"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                >
                  إنشاء حساب
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden text-[var(--text-secondary)]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-16 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-16 bottom-0 right-0 w-72 bg-[var(--bg-secondary)] border-l border-[var(--border-color)] md:hidden overflow-y-auto"
            >
              <div className="px-4 pt-4 pb-4 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      href={link.href}
                      className={`block px-3 py-2 rounded-md ${
                        isActive(link.href)
                          ? "text-sidrah-400 bg-sidrah-950/30"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {t(link.key)}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-4 flex flex-col gap-2">
                  <button
                    onClick={toggleTheme}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-[var(--text-secondary)] border border-[var(--border-color)] rounded-lg"
                  >
                    {theme === "dark" ? (
                      <>
                        <Sun size={16} /> وضع نهاري
                      </>
                    ) : (
                      <>
                        <Moon size={16} /> وضع ليلي
                      </>
                    )}
                  </button>
                  <Link
                    href="/login"
                    className="block text-center px-4 py-2 text-[var(--text-secondary)] border border-[var(--border-color)] rounded-lg"
                  >
                    تسجيل الدخول
                  </Link>
                  <Link
                    href="/register"
                    className="block text-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg"
                  >
                    إنشاء حساب
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

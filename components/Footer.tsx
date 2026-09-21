import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Linkedin, Facebook } from "lucide-react";
import T from "@/components/T";

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-color)] mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image src="/logo-icon.jpg" alt="Sidrah" width={32} height={32} className="rounded-lg" />
              <span className="text-lg font-bold text-[var(--text-primary)]">SIDRAH</span>
            </div>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed"><T k="footer.tagline" /></p>
          </div>

          <div>
            <h3 className="text-[var(--text-primary)] font-medium mb-4"><T k="footer.platform" /></h3>
            <ul className="space-y-2">
              <li><Link href="/courses" className="text-[var(--text-secondary)] hover:text-cyan-400 text-sm"><T k="footer.courses" /></Link></li>
              <li><Link href="/about" className="text-[var(--text-secondary)] hover:text-cyan-400 text-sm"><T k="footer.about" /></Link></li>
              <li><Link href="/contact" className="text-[var(--text-secondary)] hover:text-cyan-400 text-sm"><T k="footer.contact" /></Link></li>
              <li><Link href="/faq" className="text-[var(--text-secondary)] hover:text-cyan-400 text-sm"><T k="footer.faq" /></Link></li>
              <li><Link href="/blog" className="text-[var(--text-secondary)] hover:text-cyan-400 text-sm"><T k="footer.blog" /></Link></li>
              <li><Link href="/paths" className="text-[var(--text-secondary)] hover:text-cyan-400 text-sm"><T k="footer.paths" /></Link></li>
              <li><Link href="/leaderboard" className="text-[var(--text-secondary)] hover:text-cyan-400 text-sm"><T k="footer.leaderboard" /></Link></li>
              <li><Link href="/wishlist" className="text-[var(--text-secondary)] hover:text-cyan-400 text-sm"><T k="footer.wishlist" /></Link></li>
              <li><Link href="/help" className="text-[var(--text-secondary)] hover:text-cyan-400 text-sm"><T k="footer.help" /></Link></li>
              <li><Link href="/live" className="text-[var(--text-secondary)] hover:text-cyan-400 text-sm">البث المباشر</Link></li>
              <li><Link href="/pricing" className="text-[var(--text-secondary)] hover:text-cyan-400 text-sm">الأسعار</Link></li>
              <li><Link href="/certificates" className="text-[var(--text-secondary)] hover:text-cyan-400 text-sm">شهاداتي</Link></li>
              <li><Link href="/assessment" className="text-[var(--text-secondary)] hover:text-cyan-400 text-sm">تحديد المستوى</Link></li>
              <li><Link href="/compare" className="text-[var(--text-secondary)] hover:text-cyan-400 text-sm">قارن الكورسات</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[var(--text-primary)] font-medium mb-4"><T k="footer.followUs" /></h3>
            <ul className="space-y-3">
              <li>
                <a href="https://www.linkedin.com/company/sidrah-soft/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-cyan-400 text-sm transition-colors">
                  <Linkedin size={18} className="text-cyan-400" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/share/1MArjRDTf4/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-cyan-400 text-sm transition-colors">
                  <Facebook size={18} className="text-cyan-400" />
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[var(--text-primary)] font-medium mb-4"><T k="footer.contactInfo" /></h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-[var(--text-secondary)] text-sm"><Mail size={16} className="text-cyan-400" /> support@sidrah.com</li>
              <li className="flex items-center gap-2 text-[var(--text-secondary)] text-sm"><Phone size={16} className="text-cyan-400" /> +20 10 27285487</li>
              <li className="flex items-center gap-2 text-[var(--text-secondary)] text-sm"><MapPin size={16} className="text-cyan-400" /> إيتاي البارود، مصر</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[var(--border-color)] mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[var(--text-muted)] text-sm">© 2026 Sidrah. <T k="footer.rights" /></p>
          <div className="flex gap-5 text-sm">
            <Link href="/privacy" className="text-[var(--text-muted)] hover:text-cyan-400">سياسة الخصوصية</Link>
            <Link href="/terms" className="text-[var(--text-muted)] hover:text-cyan-400">شروط الاستخدام</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

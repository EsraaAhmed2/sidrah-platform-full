import type { Metadata } from "next";
import { Cairo, Tajawal, Poppins } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});
const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
  display: "swap",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});
import { ThemeProvider } from "@/context/ThemeContext";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";
import CommandPalette from "@/components/CommandPalette";
import Onboarding from "@/components/Onboarding";
import OfflineBanner from "@/components/OfflineBanner";
import PromoBar from "@/components/PromoBar";
import ScrollTop from "@/components/ScrollTop";
import ShortcutsModal from "@/components/ShortcutsModal";
import PWARegister from "@/components/PWARegister";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://sidrah.com"),
  title: {
    default: "Sidrah - تعلم البرمجة بأسلوب احترافي",
    template: "%s | Sidrah",
  },
  description: "منصة تعليمية متكاملة لتعلم البرمجة والتقنية من الصفر حتى الاحتراف",
  keywords: ["تعلم البرمجة", "كورسات برمجة", "React", "Python", "تعليم اونلاين"],
  openGraph: {
    title: "Sidrah - تعلم البرمجة بأسلوب احترافي",
    description: "منصة تعليمية متكاملة لتعلم البرمجة والتقنية",
    type: "website",
    locale: "ar_EG",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${tajawal.variable} ${poppins.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0ea5e9" />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <CartProvider>
          <AuthProvider>
          <LanguageProvider>
            <OfflineBanner />
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:right-2 focus:z-[300] focus:bg-sidrah-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
            >
              تخطي إلى المحتوى
            </a>
            <PromoBar />
            <Navbar />
            <main id="main-content" className="flex-1">{children}</main>
            <Footer />
            <AIChat />
            <CommandPalette />
            <Onboarding />
            <ScrollTop />
            <ShortcutsModal />
            <PWARegister />
            <Toaster position="top-center" richColors dir="rtl" />
          </LanguageProvider>
          </AuthProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

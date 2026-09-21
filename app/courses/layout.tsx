import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الكورسات",
  description: "تصفح جميع كورسات البرمجة على منصة Sidrah",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

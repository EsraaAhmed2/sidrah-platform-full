import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تحديد المستوى",
  description: "اختبار سريع لتحديد مستواك",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

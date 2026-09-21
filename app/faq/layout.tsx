import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الأسئلة الشائعة",
  description: "إجابات على أكثر الأسئلة شيوعاً",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

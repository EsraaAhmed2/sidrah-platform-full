import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "مسارات التعلم",
  description: "مسارات منظمة من الصفر للاحتراف",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

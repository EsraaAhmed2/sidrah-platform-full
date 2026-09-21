import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "لوحة الإدارة",
  description: "إحصائيات وإدارة المنصة",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

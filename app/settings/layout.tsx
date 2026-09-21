import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الإعدادات",
  description: "إدارة إعدادات حسابك",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

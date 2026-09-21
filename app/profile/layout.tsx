import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الملف الشخصي",
  description: "إدارة بياناتك الشخصية",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

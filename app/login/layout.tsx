import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تسجيل الدخول",
  description: "ادخل لحسابك في Sidrah",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

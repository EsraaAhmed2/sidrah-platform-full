import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الأسعار",
  description: "باقات اشتراك Sidrah",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

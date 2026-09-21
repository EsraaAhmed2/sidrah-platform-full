import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "البحث",
  description: "ابحث في كورسات ومعلمي Sidrah",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

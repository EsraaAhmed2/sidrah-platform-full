import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "مقارنة الكورسات",
  description: "قارن بين الكورسات جنباً لجنب",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

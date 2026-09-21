import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "البث المباشر",
  description: "جلسات تعليمية مباشرة",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

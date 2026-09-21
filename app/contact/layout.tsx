import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: "تواصل مع فريق Sidrah",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

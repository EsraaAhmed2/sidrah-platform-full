import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "من نحن",
  description: "تعرف على منصة Sidrah",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

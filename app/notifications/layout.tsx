import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الإشعارات",
  description: "آخر التحديثات والإشعارات",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

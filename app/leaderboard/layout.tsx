import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "المتصدرين",
  description: "أنشط المتعلمين على المنصة",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

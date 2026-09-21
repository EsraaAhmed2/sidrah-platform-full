import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "لوحة التحكم",
  description: "تابع تقدمك وكورساتك وإنجازاتك",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

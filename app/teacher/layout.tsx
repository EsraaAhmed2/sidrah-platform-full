import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "لوحة المعلم",
  description: "إدارة كورساتك وطلابك",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

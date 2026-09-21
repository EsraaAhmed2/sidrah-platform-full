import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سلة المشتريات",
  description: "راجع كورساتك وأتمم الدفع",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "شهاداتي",
  description: "شهادات إتمام الكورسات",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

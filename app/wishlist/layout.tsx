import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "المفضلة",
  description: "الكورسات التي حفظتها",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "مركز المساعدة",
  description: "مساعدة ودعم فني",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

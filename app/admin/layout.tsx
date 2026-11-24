import type { Metadata } from "next";
import { AdminShell } from "@/components/crm/admin-shell";
import "./admin.css";

export const metadata: Metadata = {
  title: "Panel organizatora | Płomień Camp",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}

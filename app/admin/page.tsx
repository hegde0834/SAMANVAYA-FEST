import React from "react";
import { Metadata } from "next";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Organizer Portal | SAMANVAYA 2.0 — NIE Mysuru",
  description: "Secure management console for SAMANVAYA 2.0 fest organizers.",
};

export default function AdminPage() {
  return <AdminDashboard />;
}

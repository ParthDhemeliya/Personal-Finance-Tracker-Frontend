"use client";

import DashboardLayout from "@/common/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  );
}

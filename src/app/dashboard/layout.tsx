"use client";

import { Inter } from "next/font/google";
import DashboardLayout from "../../common/DashboardLayout";
import ProtectedRoute from "../../components/ProtectedRoute";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className={inter.className}>
        <DashboardLayout>{children}</DashboardLayout>
      </div>
    </ProtectedRoute>
  );
}

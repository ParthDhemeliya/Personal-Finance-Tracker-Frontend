import ProtectedLayout from "../(protected)/ProtectedLayout";
import DashboardShell from "../../components/Dashboard/DashboardShell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedLayout>
      <DashboardShell>{children}</DashboardShell>
    </ProtectedLayout>
  );
}

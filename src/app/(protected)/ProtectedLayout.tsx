import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// ProtectedLayout component to ensure user is authenticated
export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  return <>{children}</>;
}

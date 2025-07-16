// src/app/(protected)/ProtectedLayout.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  console.log("ProtectedLayout token", token);

  if (!token) {
    redirect("/login");
  }

  return <>{children}</>;
}

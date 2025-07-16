import { cookies } from "next/headers";
import DashboardClient from "../../components/Dashboard/DashboardClient";
import type { User, Balance, Stats } from "@/types/Interface";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  console.log("tokennn", token);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  console.log("baseUrl", baseUrl);
  if (!token) {
    return (
      <div className="text-center mt-10 text-red-500">
        <h1 className="text-2xl font-semibold">Unauthorized</h1>
        <p>You must be logged in to view the dashboard.</p>
      </div>
    );
  }

  const cookieHeader = `token=${token}`;
  const headers = { Cookie: cookieHeader };

  try {
    // Fetch user
    const userRes = await fetch(`${baseUrl}/auth/user`, {
      headers,
      cache: "no-store",
    });

    if (!userRes.ok) {
      const errorText = await userRes.text();
      console.error("userRes error:", errorText);
      throw new Error("Failed to fetch user");
    }

    const user: User = await userRes.json();

    // Fetch balance
    const balanceRes = await fetch(`${baseUrl}/v1/balance`, {
      headers,
      cache: "no-store",
    });

    if (!balanceRes.ok) {
      const errorText = await balanceRes.text();
      console.error("balanceRes error:", errorText);
      throw new Error("Failed to fetch balance");
    }

    const balance: Balance = await balanceRes.json();

    // Fetch stats
    const statsRes = await fetch(`${baseUrl}/v1/expenses/stats`, {
      headers,
      cache: "no-store",
    });

    if (!statsRes.ok) {
      const errorText = await statsRes.text();
      console.error("statsRes error:", errorText);
      throw new Error("Failed to fetch stats");
    }

    const stats: Stats = await statsRes.json();

    return <DashboardClient user={user} balance={balance} stats={stats} />;
  } catch (error) {
    console.error("Error loading dashboard:", error);
    return (
      <div className="text-center mt-10 text-red-500">
        <h1 className="text-2xl font-semibold">Error</h1>
        <p>Something went wrong while loading the dashboard.</p>
      </div>
    );
  }
}

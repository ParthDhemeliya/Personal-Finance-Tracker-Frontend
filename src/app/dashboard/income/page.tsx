import { cookies } from "next/headers";
import IncomeTableClient from "@/components/IncomeTableClient";

const PAGE_LIMIT = 6;

async function fetchInitialIncomeData(token: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const cookieHeader = `token=${token}`;
  const headers = { Cookie: cookieHeader };

  // Fetch paginated incomes
  const incomesRes = await fetch(
    `${baseUrl}/v1/income/paginated?page=1&limit=${PAGE_LIMIT}`,
    {
      headers,
      cache: "no-store",
    },
  );
  const incomes = incomesRes.ok ? await incomesRes.json() : [];

  // Fetch total income
  const totalIncomeRes = await fetch(`${baseUrl}/v1/incomes/total`, {
    headers,
    cache: "no-store",
  });
  let overallTotalIncome = 0;
  if (totalIncomeRes.ok) {
    const totalIncomeData = await totalIncomeRes.json();
    if (
      totalIncomeData &&
      typeof totalIncomeData.total === "object" &&
      totalIncomeData.total !== null &&
      "$numberDecimal" in totalIncomeData.total
    ) {
      overallTotalIncome = parseFloat(totalIncomeData.total.$numberDecimal);
    } else if (typeof totalIncomeData.total === "number") {
      overallTotalIncome = totalIncomeData.total;
    } else {
      overallTotalIncome = 0;
    }
    console.log("overallTotalIncome (parsed):", overallTotalIncome);
  } else {
    console.log("totalIncomeRes not ok", totalIncomeRes.status);
  }

  // Fetch total count/pages if needed (assume paginated response includes it)
  return { incomes, overallTotalIncome };
}

export default async function IncomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return (
      <div className="text-center mt-10 text-red-500">
        <h1 className="text-2xl font-semibold">Unauthorized</h1>
        <p>You must be logged in to view the income page.</p>
      </div>
    );
  }

  const { incomes, overallTotalIncome } = await fetchInitialIncomeData(token);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-gray-200">
        {/* Pass SSR data to client component for full interactivity */}
        <IncomeTableClient
          initialIncomes={incomes}
          initialTotalIncome={overallTotalIncome}
        />
      </div>
    </div>
  );
}

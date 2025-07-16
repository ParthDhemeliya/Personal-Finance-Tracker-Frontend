import ExpenseTableClient from "@/components/ExpenseTableClient";
import { cookies } from "next/headers";
// import ExpenseTableClient from "@/components/ExpenseTableClient";

const PAGE_LIMIT = 6;

async function fetchInitialExpenseData(token: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const cookieHeader = `token=${token}`;
  const headers = { Cookie: cookieHeader };

  // Fetch paginated expenses
  const expensesRes = await fetch(
    `${baseUrl}/v1/expenses/paginated?page=1&limit=${PAGE_LIMIT}`,
    { headers, cache: "no-store" },
  );
  const expenses = expensesRes.ok ? await expensesRes.json() : [];
  // If the response is { data: [...] }, do:
  const expensesArray = Array.isArray(expenses)
    ? expenses
    : expenses.data || [];

  // Fetch total expense
  const totalExpenseRes = await fetch(`${baseUrl}/v1/expenses/total`, {
    headers,
    cache: "no-store",
  });
  let overallTotalExpense = 0;
  if (totalExpenseRes.ok) {
    const totalExpenseData = await totalExpenseRes.json();
    if (
      totalExpenseData &&
      typeof totalExpenseData.total === "object" &&
      totalExpenseData.total !== null &&
      "$numberDecimal" in totalExpenseData.total
    ) {
      overallTotalExpense = parseFloat(totalExpenseData.total.$numberDecimal);
    } else {
      overallTotalExpense = totalExpenseData.total ?? 0;
    }
  }

  return { expensesArray, overallTotalExpense };
}

export default async function ExpensePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return (
      <div className="text-center mt-10 text-red-500">
        <h1 className="text-2xl font-semibold">Unauthorized</h1>
        <p>You must be logged in to view the expense page.</p>
      </div>
    );
  }

  const { expensesArray, overallTotalExpense } =
    await fetchInitialExpenseData(token);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-gray-200">
        <ExpenseTableClient
          initialExpenses={expensesArray}
          initialTotalExpense={overallTotalExpense}
        />
      </div>
    </div>
  );
}

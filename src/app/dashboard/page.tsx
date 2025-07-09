"use client";

import {
  DollarSign,
  TrendingUp,
  CreditCard,
  ArrowUpIcon,
  ArrowDownIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import SavingsGoalCard from "../../components/Dashboard/SavingsGoalCard";
import SpendingPieChart from "../../components/Dashboard/SpendingPieChart";
import RecentTransactionsList from "../../components/RecentTransactionsList";
import TransactionModal from "../../components/TransactionModal";
import { useAppDispatch } from "../../hooks/useTypedDispatch";
import { useAppSelector } from "../../hooks/useTypedSelector";
import { fetchUser } from "../../redux/auth/authThunk";
import { fetchBalanceThunk } from "../../redux/balance/balanceThunk";
import { addExpense } from "../../redux/expense/expense.thunks";
import { fetchExpenseStatsThunk } from "../../redux/expense/expenseStatsThunk";
import { fetchIncomeStatsThunk } from "../../redux/income/incomeStatsThunk";
import { addIncome } from "../../redux/income/incomeThunk";
import { fetchRecentTransactionsThunk } from "../../redux/recentTransactions/recentTransactionsThunk";
import { fetchSavingsGoalThunk } from "../../redux/savingsGoal/savingsGoalThunk";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const balance = useAppSelector((state) => state.balance.amount);
  const percentChange = useAppSelector((state) => state.balance.percentChange);
  const incomeAmount = useAppSelector((state) => state.incomeStats.amount);
  const incomePercentChange = useAppSelector(
    (state) => state.incomeStats.percentChange,
  );
  const expenseAmount = useAppSelector((state) => state.expenseStats.amount);
  const expensePercentChange = useAppSelector(
    (state) => state.expenseStats.percentChange,
  );

  // Modal state for Add Income/Expense
  const [transactionModalOpen, setTransactionModalOpen] = useState<
    false | "income" | "expense"
  >(false);
  console.log(user, "userrrrr");
  // New: loading and error state for user fetch
  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState<string | null>(null);
  const [userFetchAttempted, setUserFetchAttempted] = useState(false);
  // console.log("userrr",user);
  useEffect(() => {
    const fetchData = async () => {
      if (!user && !userFetchAttempted) {
        console.log("giiii");
        try {
          setUserLoading(true);
          await dispatch(fetchUser()).unwrap();
        } catch {
          setUserError("Authentication failed. Please log in again.");
          setUserFetchAttempted(true);
          window.location.href = "/login";
          return;
        } finally {
          setUserLoading(false);
        }
      }

      // Fetch only once after user is available
      if (user) {
        setUserFetchAttempted(true); // Mark to prevent double fetches
        dispatch(fetchBalanceThunk());
        dispatch(fetchIncomeStatsThunk());
        dispatch(fetchExpenseStatsThunk());
        dispatch(fetchSavingsGoalThunk());
        dispatch(fetchRecentTransactionsThunk(5));
      }
    };

    fetchData();
  }, [dispatch, user, userFetchAttempted]);

  // Handler for submitting a new transaction
  const handleTransactionSubmit = async (
    entry:
      | Omit<import("@/types/Interface").IncomeEntry, "_id">
      | Omit<import("@/types/Interface").ExpenseEntry, "_id">,
  ) => {
    if (transactionModalOpen === "income") {
      await dispatch(
        addIncome(
          entry as Omit<import("@/types/Interface").IncomeEntry, "_id">,
        ),
      );
      dispatch(fetchIncomeStatsThunk());
      dispatch(fetchBalanceThunk());
    } else if (transactionModalOpen === "expense") {
      await dispatch(
        addExpense(
          entry as Omit<import("@/types/Interface").ExpenseEntry, "_id">,
        ),
      );
      dispatch(fetchExpenseStatsThunk());
      dispatch(fetchBalanceThunk());
    }
    dispatch(fetchRecentTransactionsThunk(5));
    setTransactionModalOpen(false);
  };

  // New: Show loading or error state
  if (userLoading) return <div>Loading...</div>;
  if (userError) return <div>{userError}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {user && user.first_name
                ? `Welcome back, ${user.first_name}!`
                : "Welcome back!"}
            </h1>
            <p className="text-gray-600">
              Here's your financial overview for this month.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-end">
            <button
              className="px-5 py-2 rounded-lg bg-blue-100 text-blue-800 font-semibold border border-blue-200 hover:bg-blue-200 hover:text-blue-900 transition cursor-pointer"
              onClick={() => setTransactionModalOpen("income")}
            >
              + Add Income
            </button>
            <button
              className="px-5 py-2 rounded-lg bg-red-100 text-red-800 font-semibold border border-red-200 hover:bg-red-200 hover:text-red-900 transition cursor-pointer"
              onClick={() => setTransactionModalOpen("expense")}
            >
              + Add Expense
            </button>
          </div>
        </div>

        {/* Transaction Modal */}
        {transactionModalOpen && (
          <TransactionModal
            onClose={() => setTransactionModalOpen(false)}
            onSubmit={handleTransactionSubmit}
            mode="add"
            type={transactionModalOpen}
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Total Balance Card */}
          <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-lg border-2 border-blue-200 hover:border-blue-400 transition-colors duration-200 overflow-hidden group">
            <div className="absolute right-4 top-4 opacity-10 text-blue-300 text-7xl pointer-events-none select-none group-hover:opacity-20 transition-opacity duration-200">
              <DollarSign className="w-20 h-20" />
            </div>
            <div className="flex justify-between items-center mb-3 z-10 relative">
              <h3 className="text-base font-bold text-blue-700 tracking-wide">
                Total Balance
              </h3>
            </div>
            <div className="text-3xl font-extrabold text-blue-900 mb-2 z-10 relative">
              ₹{balance?.toLocaleString() ?? 0}
            </div>
            <p
              className={`text-sm ${percentChange > 0 ? "text-green-600" : percentChange < 0 ? "text-red-600" : "text-gray-500"} flex items-center mt-1 z-10 relative`}
            >
              {percentChange > 0 && <ArrowUpIcon className="w-4 h-4 mr-1" />}
              {percentChange < 0 && <ArrowDownIcon className="w-4 h-4 mr-1" />}
              {percentChange === 0
                ? "No change from last period"
                : `${percentChange > 0 ? "+" : ""}${percentChange}% from last period`}
            </p>
          </div>

          {/* Monthly Income Card */}
          <div className="relative bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl shadow-lg border-2 border-green-200 hover:border-green-400 transition-colors duration-200 overflow-hidden group">
            <div className="absolute right-4 top-4 opacity-10 text-green-300 text-7xl pointer-events-none select-none group-hover:opacity-20 transition-opacity duration-200">
              <TrendingUp className="w-20 h-20" />
            </div>
            <div className="flex justify-between items-center mb-3 z-10 relative">
              <h3 className="text-base font-bold text-green-700 tracking-wide">
                Monthly Income
              </h3>
            </div>
            <div className="text-3xl font-extrabold text-green-900 mb-2 z-10 relative">
              ₹{incomeAmount?.toLocaleString() ?? 0}
            </div>
            <p
              className={`text-sm ${incomePercentChange > 0 ? "text-green-600" : incomePercentChange < 0 ? "text-red-600" : "text-gray-500"} flex items-center mt-1 z-10 relative`}
            >
              {incomePercentChange > 0 && (
                <ArrowUpIcon className="w-4 h-4 mr-1" />
              )}
              {incomePercentChange < 0 && (
                <ArrowDownIcon className="w-4 h-4 mr-1" />
              )}
              {incomePercentChange === 0
                ? "No change from last month"
                : `${incomePercentChange > 100 ? "+100" : incomePercentChange < -100 ? "-100" : (incomePercentChange > 0 ? "+" : "") + Math.round(incomePercentChange)}% from last month`}
            </p>
          </div>

          {/* Monthly Expenses Card */}
          <div className="relative bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-2xl shadow-lg border-2 border-red-200 hover:border-red-400 transition-colors duration-200 overflow-hidden group">
            <div className="absolute right-4 top-4 opacity-10 text-red-300 text-7xl pointer-events-none select-none group-hover:opacity-20 transition-opacity duration-200">
              <CreditCard className="w-20 h-20" />
            </div>
            <div className="flex justify-between items-center mb-3 z-10 relative">
              <h3 className="text-base font-bold text-red-700 tracking-wide">
                Monthly Expenses
              </h3>
            </div>
            <div className="text-3xl font-extrabold text-red-900 mb-2 z-10 relative">
              ₹{expenseAmount?.toLocaleString() ?? 0}
            </div>
            <p
              className={`text-sm ${expensePercentChange > 0 ? "text-green-600" : expensePercentChange < 0 ? "text-red-600" : "text-gray-500"} flex items-center mt-1 z-10 relative`}
            >
              {expensePercentChange > 0 && (
                <ArrowUpIcon className="w-4 h-4 mr-1" />
              )}
              {expensePercentChange < 0 && (
                <ArrowDownIcon className="w-4 h-4 mr-1" />
              )}
              {expensePercentChange === 0
                ? "No change from last month"
                : `${expensePercentChange > 100 ? "+100" : expensePercentChange < -100 ? "-100" : (expensePercentChange > 0 ? "+" : "") + Math.round(expensePercentChange)}% from last month`}
            </p>
          </div>

          {/* Savings Goal Card */}
          <SavingsGoalCard />
        </div>

        {/* Charts and Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SpendingPieChart />
          <RecentTransactionsList />
        </div>
      </div>
    </div>
  );
}

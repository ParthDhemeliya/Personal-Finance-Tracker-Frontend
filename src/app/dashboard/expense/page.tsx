"use client";

import { Wallet } from "lucide-react";
import { useState, useEffect } from "react";
import TransactionModal from "@/components/TransactionModal";
import TransactionTable from "@/components/TransactionTable";
import Pagination from "@/components/Pagination";
import { useAppDispatch } from "@/hooks/useTypedDispatch";
import { useAppSelector } from "@/hooks/useTypedSelector";
import {
  fetchPaginatedExpenses,
  fetchTotalExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} from "@/redux/expense/expense.thunks";
import { setPage } from "@/redux/expense/expense.slice";
import type { ITransaction } from "@/types/Transaction";
import type { IncomeEntry, ExpenseEntry } from "@/types/Interface";
import useToast from "@/hooks/useToast";

const PAGE_LIMIT = 6;

export default function ExpensePage() {
  const dispatch = useAppDispatch();
  const {
    data: expenses,
    page: currentPage,
    totalPages,
    totalAmount,
    loading,
  } = useAppSelector((state) => state.expenses);
  const { showSuccess, showError } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<ITransaction | null>(null);
  useEffect(() => {
    dispatch(fetchPaginatedExpenses({ page: currentPage, limit: PAGE_LIMIT }));
    dispatch(fetchTotalExpenses());
  }, [dispatch, currentPage]);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleAddOrUpdate = async (
    entry: Omit<IncomeEntry, "_id"> | Omit<ExpenseEntry, "_id">,
  ) => {
    // Only handle expense entries
    if ((entry as Omit<ExpenseEntry, "_id">).type === "expense") {
      try {
        if (selectedTransaction) {
          await dispatch(
            updateExpense({
              id: selectedTransaction._id,
              data: entry as Omit<ExpenseEntry, "_id">,
            }),
          ).unwrap();
        } else {
          await dispatch(
            addExpense(entry as Omit<ExpenseEntry, "_id">),
          ).unwrap();
          dispatch(setPage(1));
        }

        dispatch(fetchPaginatedExpenses({ page: 1, limit: PAGE_LIMIT }));
        dispatch(fetchTotalExpenses());
        setModalOpen(false);
        setSelectedTransaction(null);
      } catch (err) {
        console.error("Add/update expense failed:", err);
        showError("Failed to save expense. Please try again.");
      }
    }
  };

  const handleEdit = (tx: ITransaction) => {
    setSelectedTransaction(tx);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteExpense(id)).unwrap();
      showSuccess("Expense deleted successfully!");
      dispatch(
        fetchPaginatedExpenses({ page: currentPage, limit: PAGE_LIMIT }),
      );
      dispatch(fetchTotalExpenses());
    } catch (err) {
      console.error("Delete failed:", err);
      showError("Failed to delete expense. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-gray-200">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Wallet className="w-8 h-8 text-red-600" />
            <h1 className="text-4xl font-extrabold text-gray-800">
              Expense Overview
            </h1>
          </div>
          <button
            onClick={() => {
              setModalOpen(true);
              setSelectedTransaction(null);
            }}
            className="px-5 py-2 rounded-lg bg-red-100 text-red-800 font-semibold border border-red-200 hover:bg-red-200 hover:text-red-900 transition cursor-pointer"
          >
            + Add Expense
          </button>
        </div>

        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg shadow-sm flex items-center gap-2">
          <Wallet className="text-red-600 w-5 h-5" />
          <h2 className="text-lg font-semibold text-gray-800">
            Total Expense:{" "}
            <span className="text-red-700 font-bold">
              ₹ {totalAmount.toLocaleString()}
            </span>
          </h2>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 italic">
            Loading expenses...
          </p>
        ) : (
          <>
            <TransactionTable
              data={expenses}
              type="expense"
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}

        {modalOpen && (
          <TransactionModal
            onClose={() => {
              setModalOpen(false);
              setSelectedTransaction(null);
            }}
            onSubmit={handleAddOrUpdate}
            type="expense"
            mode={selectedTransaction ? "edit" : "add"}
            initialData={
              selectedTransaction
                ? { ...selectedTransaction, type: "expense" }
                : undefined
            }
          />
        )}
      </div>
    </div>
  );
}

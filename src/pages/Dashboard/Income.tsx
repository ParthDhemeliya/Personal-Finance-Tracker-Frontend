import { Wallet, IndianRupee } from "lucide-react";
import { useState, useEffect } from "react";
import TransactionModal from "../../components/TransactionModal";
import useToast from "../../hooks/useToast";
import TransactionTable from "../../components/TransactionTable";
import Pagination from "../../components/Pagination";
import { useAppDispatch } from "../../hooks/useTypedDispatch";
import { useAppSelector } from "../../hooks/useTypedSelector";
import {
  fetchPaginatedIncomes,
  addIncome,
  deleteIncome,
  fetchTotalIncome,
  updateIncome,
} from "../../redux/income/incomeThunk";
import { setPage } from "../../redux/income/incomeSlice";
import type { ITransaction } from "../../types/Transaction";
import type { IncomeEntry, ExpenseEntry } from "../../types/Interface";

const PAGE_LIMIT = 5;

const Income = () => {
  const dispatch = useAppDispatch();
  const {
    data: incomes,
    total,
    currentPage,
    totalPages,
    loading,
    overallTotalIncome,
  } = useAppSelector((state) => state.income);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<ITransaction | null>(null);

  useEffect(() => {
    dispatch(fetchPaginatedIncomes({ page: 1, limit: PAGE_LIMIT }));
    dispatch(setPage(1));
    dispatch(fetchTotalIncome());
  }, [dispatch]);
  const { showSuccess, showError } = useToast();
  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
    dispatch(fetchPaginatedIncomes({ page, limit: PAGE_LIMIT }));
  };

  const handleAddOrUpdate = async (
    entry: Omit<IncomeEntry, "_id"> | Omit<ExpenseEntry, "_id">,
  ) => {
    // Only handle income entries
    if ((entry as Omit<IncomeEntry, "_id">).type === "income") {
      try {
        if (selectedTransaction) {
          // Edit mode
          await dispatch(
            updateIncome({
              id: selectedTransaction._id,
              data: entry as Omit<IncomeEntry, "_id">,
            }),
          ).unwrap();
        } else {
          // Add mode
          await dispatch(addIncome(entry as Omit<IncomeEntry, "_id">)).unwrap();
        }

        dispatch(fetchPaginatedIncomes({ page: 1, limit: PAGE_LIMIT }));
        dispatch(setPage(1));
        dispatch(fetchTotalIncome());
        setModalOpen(false);
        setSelectedTransaction(null);
      } catch (err) {
        console.error("Add/Edit income failed:", err);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteIncome(id)).unwrap();
      showSuccess("Income deleted successfully!");
      dispatch(fetchPaginatedIncomes({ page: currentPage, limit: PAGE_LIMIT }));
      dispatch(fetchTotalIncome());
    } catch (err) {
      console.error("Delete income failed:", err);
      showError("Failed to delete income. Please try again.");
    }
  };

  const handleEdit = (tx: ITransaction) => {
    setSelectedTransaction(tx);
    setModalOpen(true);
  };

  console.log(selectedTransaction, "selectedTransaction");
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-gray-200">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <Wallet className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-extrabold text-gray-800">
              Income Overview
            </h1>
          </div>
          <button
            onClick={() => {
              setModalOpen(true);
              setSelectedTransaction(null);
            }}
            className="px-5 py-2 rounded-lg bg-blue-100 text-blue-800 font-semibold border border-blue-200 hover:bg-blue-200 hover:text-blue-900 transition cursor-pointer"
          >
            + Add Income
          </button>
        </div>

        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm flex items-center gap-2">
          <IndianRupee className="text-blue-600 w-5 h-5" />
          <h2 className="text-lg font-semibold text-gray-800">
            Total Income:{" "}
            <span className="text-blue-700 font-bold">
              {overallTotalIncome.toLocaleString()}
            </span>
          </h2>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 italic">Loading incomes...</p>
        ) : (
          <>
            <TransactionTable
              data={incomes}
              type="income"
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
            <Pagination
              total={total}
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
            type="income"
            mode={selectedTransaction ? "edit" : "add"}
            initialData={
              selectedTransaction
                ? {
                    ...selectedTransaction,
                    type: "income",
                  }
                : undefined
            }
          />
        )}
      </div>
    </div>
  );
};

export default Income;

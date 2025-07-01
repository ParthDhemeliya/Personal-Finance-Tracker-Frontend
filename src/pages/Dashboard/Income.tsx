import { Wallet, Plus, IndianRupee } from "lucide-react";
import { useState, useEffect } from "react";
import TransactionModal from "../../components/TransactionModal";
import { showSuccess } from "../../utils/toastUtils";
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
import type { IncomeEntry } from "../../types/Interface";

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

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
    dispatch(fetchPaginatedIncomes({ page, limit: PAGE_LIMIT }));
  };

  const handleAddOrUpdate = async (
    entry: Omit<ITransaction, "_id" | "type">,
  ) => {
    const incomePayload = {
      ...entry,
      type: "income" as const,
      incomeSource: entry.customIncomeSource,
    };

    try {
      if (selectedTransaction) {
        // Edit mode
        await dispatch(
          updateIncome({ id: selectedTransaction._id, data: incomePayload }),
        ).unwrap();
        showSuccess("Income updated successfully!");
      } else {
        // Add mode
        await dispatch(
          addIncome(incomePayload as Omit<IncomeEntry, "_id">),
        ).unwrap();
        showSuccess("Income added successfully!");
      }

      dispatch(fetchPaginatedIncomes({ page: 1, limit: PAGE_LIMIT }));
      dispatch(setPage(1));
      dispatch(fetchTotalIncome());
      setModalOpen(false);
      setSelectedTransaction(null);
    } catch (err) {
      console.error("Add/Edit income failed:", err);
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 cursor-pointer transition duration-200 shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add Income
          </button>
        </div>

        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg shadow-sm flex items-center gap-2">
          <IndianRupee className="text-red-600 w-5 h-5" />
          <h2 className="text-lg font-semibold text-gray-800">
            Total Income:{" "}
            <span className="text-red-700 font-bold">
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

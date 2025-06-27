import { Wallet, Plus, IndianRupee } from "lucide-react";
import { useState, useEffect } from "react";
import TransactionModal from "../../components/TransactionModal";
import TransactionTable from "../../components/TransactionTable";
import { useAppDispatch } from "../../hooks/useTypedDispatch";
import { useAppSelector } from "../../hooks/useTypedSelector";
import {
  fetchIncomes,
  addIncome,
  deleteIncome,
} from "../../redux/income/incomeThunk";
import type { ITransaction } from "../../types/Transaction";
import type { IncomeEntry } from "../../types/Interface";

const Income = () => {
  const dispatch = useAppDispatch();
  const { incomes, loading } = useAppSelector((state) => state.income);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchIncomes());
  }, [dispatch]);

  const totalIncome = incomes.reduce((acc, tx) => acc + tx.amount, 0);

  const handleAddOrUpdate = async (
    entry: Omit<ITransaction, "_id" | "type">,
  ) => {
    const incomePayload = {
      ...entry,
      type: "income",
      incomeSource: entry.category, // 👈 ensure this mapping
    };

    try {
      await dispatch(
        addIncome(incomePayload as Omit<IncomeEntry, "_id">),
      ).unwrap();
      await dispatch(fetchIncomes());
      setModalOpen(false);
    } catch (err) {
      console.error("Add income failed:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteIncome(id)).unwrap();
      dispatch(fetchIncomes());
    } catch (err) {
      console.error("Delete income failed:", err);
    }
  };

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
            onClick={() => setModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
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
              {totalIncome.toLocaleString()}
            </span>
          </h2>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 italic">Loading incomes...</p>
        ) : (
          <TransactionTable
            data={incomes}
            type="income"
            onDelete={handleDelete}
          />
        )}

        {modalOpen && (
          <TransactionModal
            onClose={() => setModalOpen(false)}
            onSubmit={handleAddOrUpdate}
            type="income"
            mode="add"
          />
        )}
      </div>
    </div>
  );
};

export default Income;

import { Wallet, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import TransactionModal from "../../components/TransactionModal";
import TransactionTable from "../../components/TransactionTable";
import { useAppDispatch } from "../../hooks/useTypedDispatch";
import { useAppSelector } from "../../hooks/useTypedSelector";
import { fetchIncomes, addIncome, deleteIncome } from "../../redux/income/incomeThunk";
import type { Transaction } from "../../types/Transaction";

const Income = () => {
  const dispatch = useAppDispatch();
  const { incomes, loading } = useAppSelector((state) => state.income);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTx, setEditTx] = useState<Transaction | null>(null);

  useEffect(() => {
    dispatch(fetchIncomes());
  }, [dispatch]);

  const handleAddOrUpdate = async (entry: Omit<Transaction, "_id" | "type">) => {
    try {
      await dispatch(addIncome(entry)).unwrap();
      dispatch(fetchIncomes());
      setModalOpen(false);
      setEditTx(null);
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
            onClick={() => {
              setEditTx(null);
              setModalOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Income
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 italic">Loading incomes...</p>
        ) : (
          <TransactionTable
            data={incomes as Transaction[]}
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
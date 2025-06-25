import { useState } from "react";
import { Wallet, Plus } from "lucide-react";
import { dummyTransactions } from "../../utils/dummyTransactions";
import { type Transaction } from "../../types/Transaction";
import TransactionModal from "../../components/TransactionModal";
import TransactionTable from "../../components/TransactionTable";

const Income = () => {
  const [transactions, setTransactions] =
    useState<Transaction[]>(dummyTransactions);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTx, setEditTx] = useState<Transaction | null>(null);

  const incomeTransactions = transactions.filter((tx) => tx.type === "income");

  const handleAddOrUpdate = (entry: Transaction) => {
    setTransactions((prev) => {
      const exists = prev.find((t) => t.id === entry.id);
      if (exists) {
        return prev.map((t) => (t.id === entry.id ? entry : t));
      } else {
        return [entry, ...prev];
      }
    });
    setModalOpen(false);
    setEditTx(null);
  };

  const handleDelete = (id: number) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-gray-200">
        {/* Header */}
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

        {/* Transaction Table */}
        <TransactionTable
          data={incomeTransactions}
          type="income"
          onDelete={handleDelete}
        />

        {/* Modal */}
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

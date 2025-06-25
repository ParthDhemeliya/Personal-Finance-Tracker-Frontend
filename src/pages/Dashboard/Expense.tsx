import { useState } from "react";
import { Wallet, Plus, IndianRupee } from "lucide-react";
import { dummyTransactions } from "../../utils/dummyTransactions";
import { type Transaction } from "../../types/Transaction";
import TransactionModal from "../../components/TransactionModal";
import TransactionTable from "../../components/TransactionTable";

const Expense = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(dummyTransactions);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTx, setEditTx] = useState<Transaction | null>(null);

  const expenseTransactions = transactions.filter((tx) => tx.type === "expense");

  const totalExpense = expenseTransactions.reduce((acc, tx) => acc + tx.amount, 0);

  const handleAddOrUpdate = (entry: Transaction) => {
    setTransactions((prev) => {
      const exists = prev.find((t) => t.id === entry.id);
      return exists
        ? prev.map((t) => (t.id === entry.id ? entry : t))
        : [entry, ...prev];
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
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <Wallet className="w-8 h-8 text-red-600" />
            <h1 className="text-4xl font-extrabold text-gray-800">Expense Overview</h1>
          </div>
          <button
            onClick={() => {
              setEditTx(null);
              setModalOpen(true);
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Expense
          </button>
        </div>

        {/* Total Expense Summary */}
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg shadow-sm flex items-center gap-2">
          <IndianRupee className="text-red-600 w-5 h-5" />
          <h2 className="text-lg font-semibold text-gray-800">
            Total Expense:{" "}
            <span className="text-red-700 font-bold">
              ₹ {totalExpense.toLocaleString()}
            </span>
          </h2>
        </div>

        {/* Transaction Table */}
        <TransactionTable
          data={expenseTransactions}
          type="expense"
          onDelete={handleDelete}
          onEdit={(tx) => {
            setEditTx(tx);
            setModalOpen(true);
          }}
        />

        {/* Modal */}
        {modalOpen && (
          <TransactionModal
            onClose={() => {
              setModalOpen(false);
              setEditTx(null);
            }}
            onSubmit={handleAddOrUpdate}
            type="expense"
            mode={editTx ? "edit" : "add"}
            initialData={editTx || undefined}
          />
        )}
      </div>
    </div>
  );
};

export default Expense;

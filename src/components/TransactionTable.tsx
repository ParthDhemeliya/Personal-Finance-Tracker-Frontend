import { useState } from "react";
import { IndianRupee, Pencil, Trash2 } from "lucide-react";
import type { ITransaction, TransactionType } from "../types/Transaction";
import type { TransactionEntry } from "../types/Interface";
import { mapIncomeEntryToTransaction } from "../utils/transactionMapper";

interface TransactionTableProps {
  data: TransactionEntry[];
  type: TransactionType;
  onDelete: (id: string) => void;
  onEdit?: (tx: ITransaction) => void;
}

const TransactionTable = ({
  data = [],
  type,
  onDelete,
  onEdit,
}: TransactionTableProps) => {
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const renderCategoryName = (tx: TransactionEntry) => {
    if (tx.type === "income") {
      if (typeof tx.incomeSource === "string") return tx.incomeSource;
      if (tx.incomeSource && typeof tx.incomeSource === "object")
        return tx.incomeSource.name;
      if (tx.customIncomeSource) return tx.customIncomeSource;
    }

    if (tx.type === "expense") {
      if (typeof tx.expenseCategory === "string") return tx.expenseCategory;
      if (tx.expenseCategory && typeof tx.expenseCategory === "object")
        return tx.expenseCategory.name;
      if (tx.customExpenseCategory) return tx.customExpenseCategory;
    }

    return "—";
  };

  const handleDeleteConfirm = () => {
    if (deleteTargetId) {
      onDelete(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-base text-gray-800 border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-blue-50 text-sm uppercase text-gray-700">
            <tr>
              <th className="px-6 py-4 border-r text-left">
                {type === "income" ? "Source" : "Category"}
              </th>
              <th className="px-6 py-4 border-r text-left">Amount</th>
              <th className="px-6 py-4 border-r text-left">Date</th>
              <th className="px-6 py-4 border-r text-left">Description</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((tx, idx) => (
              <tr
                key={tx._id}
                className={`${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } border-t border-gray-200 hover:bg-blue-50 transition`}
              >
                <td className="px-6 py-5 border-r font-semibold">
                  <span
                    className={`inline-block px-2 py-1 text-sm font-medium rounded-full ${
                      type === "income"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {renderCategoryName(tx)}
                  </span>
                </td>

                <td className="px-6 py-5 border-r">
                  <div className="flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-gray-500" />
                    {tx.amount.toLocaleString()}
                  </div>
                </td>

                <td className="px-6 py-5 border-r">
                  {new Date(tx.date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>

                <td className="px-6 py-5 border-r text-gray-600">
                  {tx.description || "—"}
                </td>

                <td className="px-6 py-5 flex gap-8 items-center">
                  {onEdit && type === "income" && tx.type === "income" && (
                    <button
                      onClick={() => onEdit(mapIncomeEntryToTransaction(tx))}
                      className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer transition duration-200"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>
                  )}
                  {onEdit && type === "expense" && tx.type === "expense" && (
                    <button
                      onClick={() => onEdit(tx as ITransaction)}
                      className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer transition duration-200"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => setDeleteTargetId(tx._id)}
                    className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 cursor-pointer transition duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-6 text-gray-500 italic text-base"
                >
                  No {type} records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {deleteTargetId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full border border-gray-300">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Confirm Deletion
            </h2>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete this transaction?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeleteTargetId(null)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionTable;

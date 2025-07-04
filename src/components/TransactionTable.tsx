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
      <div className="w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full text-sm md:text-base text-gray-800">
          <thead className="bg-blue-50 uppercase text-gray-700">
            <tr>
              <th className="px-4 md:px-6 py-4 text-left whitespace-nowrap">
                {type === "income" ? "Source" : "Category"}
              </th>
              <th className="px-4 md:px-6 py-4 text-left whitespace-nowrap">
                Amount
              </th>
              <th className="px-4 md:px-6 py-4 text-left whitespace-nowrap">
                Date
              </th>
              <th className="px-4 md:px-6 py-4 text-left whitespace-nowrap">
                Description
              </th>
              <th className="px-4 md:px-6 py-4 text-left whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((tx, idx) => (
              <tr
                key={tx._id}
                className={`${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-50 border-t border-gray-200 transition`}
              >
                <td className="px-4 md:px-6 py-4 font-medium whitespace-nowrap">
                  <span
                    className={`inline-block px-2 py-1 text-xs md:text-sm font-semibold rounded-full ${
                      type === "income"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {renderCategoryName(tx)}
                  </span>
                </td>

                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1 md:gap-2">
                    <IndianRupee className="w-4 h-4 text-gray-500" />
                    <span>{tx.amount.toLocaleString()}</span>
                  </div>
                </td>

                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  {new Date(tx.date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>

                <td className="px-4 md:px-6 py-4 text-gray-600 whitespace-nowrap">
                  {tx.description || "—"}
                </td>

                <td className="px-4 md:px-6 py-4 flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-center whitespace-nowrap">
                  {onEdit && type === "income" && tx.type === "income" && (
                    <button
                      onClick={() => onEdit(mapIncomeEntryToTransaction(tx))}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-semibold transition"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>
                  )}
                  {onEdit && type === "expense" && tx.type === "expense" && (
                    <button
                      onClick={() => onEdit(tx as ITransaction)}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-semibold transition"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => setDeleteTargetId(tx._id)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-semibold transition"
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
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
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

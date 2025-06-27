import { IndianRupee, Pencil, Trash2 } from "lucide-react";
import { type ITransaction, type TransactionType } from "../types/Transaction";
import type { IncomeEntry } from "../types/Interface";

interface TransactionTableProps {
  data: IncomeEntry[];
  type: TransactionType;
  onDelete: (id: string) => void;
  onEdit?: (tx: ITransaction) => void;
}

const TransactionTable = ({
  data,
  type,
  onDelete,
  onEdit,
}: TransactionTableProps) => {
  return (
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
                  {tx._id}
                </span>
              </td>

              <td className="px-6 py-5 border-r">
                <div className="flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-gray-500" />₹{" "}
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

              <td className="px-6 py-5 flex gap-3 items-center">
                {type === "expense" && onEdit && (
                  <button
                    onClick={() => onEdit(tx._id)}
                    className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </button>
                )}
                <button
                  onClick={() => onDelete(tx._id)}
                  className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-1"
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
  );
};

export default TransactionTable;

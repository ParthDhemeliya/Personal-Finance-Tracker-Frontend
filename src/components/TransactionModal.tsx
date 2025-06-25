import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { type Transaction, type TransactionType } from "../types/Transaction";

interface TransactionModalProps {
  onClose: () => void;
  onSubmit: (entry: Transaction) => void;
  mode: "add" | "edit";
  initialData?: Transaction;
  type: TransactionType;
}

const TransactionModal = ({
  onClose,
  onSubmit,
  mode,
  type,
  initialData,
}: TransactionModalProps) => {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    amount: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        amount: initialData.amount.toString(),
        category: initialData.category,
        date: initialData.date,
        description: initialData.description || "",
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = { amount: "", category: "", date: "" };
    let valid = true;

    if (
      !formData.amount ||
      isNaN(Number(formData.amount)) ||
      Number(formData.amount) <= 0
    ) {
      newErrors.amount = "Amount must be a positive number";
      valid = false;
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
      valid = false;
    }

    if (!formData.date.trim()) {
      newErrors.date = "Date is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const transaction: Transaction = {
      id: initialData?.id || Date.now(),
      type,
      amount: Number(formData.amount),
      category: formData.category,
      date: formData.date,
      description: formData.description,
    };

    onSubmit(transaction);
  };

  const color = type === "income" ? "blue" : "red";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 backdrop-blur-sm bg-transparent">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 relative"
      >
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 text-gray-600 hover:text-red-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="cursor-pointer text-2xl font-bold mb-6 text-gray-800">
          {mode === "add" ? "Add" : "Edit"}{" "}
          {type === "income" ? "Income" : "Expense"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">Amount (₹)</label>
            <input
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none ${
                errors.amount
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="e.g. 1000"
            />
            {errors.amount && (
              <p className="text-sm text-red-600 mt-1">{errors.amount}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">
              {type === "income" ? "Source" : "Spent on"}
            </label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none ${
                errors.category
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder={
                type === "income" ? "e.g. Freelance Project" : "e.g. Groceries"
              }
            />
            {errors.category && (
              <p className="text-sm text-red-600 mt-1">{errors.category}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Date</label>
            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none ${
                errors.date
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.date && (
              <p className="text-sm text-red-600 mt-1">{errors.date}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Optional"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2 cursor-pointer rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`px-6 py-2 rounded-lg bg-${color}-600 cursor-pointer hover:bg-${color}-700 text-white font-semibold`}
          >
            {mode === "add" ? "Save" : "Update"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default TransactionModal;

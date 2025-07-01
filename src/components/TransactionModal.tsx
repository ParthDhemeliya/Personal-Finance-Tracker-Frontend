import { useState, useEffect } from "react";
// import { showSuccess } from "../utils/toastUtils";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { type ITransaction, type TransactionType } from "../types/Transaction";
import type { PaymentMethod } from "../types/commonTypes";
import CategoryDropdown from "../common/CategoryDropdown";

type FormData = {
  amount: string;
  categoryId: string;
  date: string;
  description: string;
  paymentMethod: PaymentMethod;
};

interface TransactionModalProps {
  onClose: () => void;
  onSubmit: (entry: Omit<ITransaction, "_id" | "type">) => Promise<void>;
  mode: "add" | "edit";
  initialData?: ITransaction;
  type: TransactionType;
}

const isValidObjectId = (id: string) => /^[0-9a-fA-F]{24}$/.test(id.trim());

const TransactionModal = ({
  onClose,
  onSubmit,
  mode,
  type,
  initialData,
}: TransactionModalProps) => {
  console.log(initialData, "initialData in TransactionModal");
  const today = new Date().toISOString().split("T")[0];
  const [customCategoryName, setCustomCategoryName] = useState("");
  const [formData, setFormData] = useState<FormData>({
    amount: "",
    categoryId: "",
    date: today,
    description: "",
    paymentMethod: "cash",
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({
    amount: "",
    categoryId: "",
    date: "",
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      let categoryId = "";
      setCustomCategoryName(""); // Reset custom name on each open

      if (type === "expense") {
        if (typeof initialData.expenseCategory === "string") {
          categoryId = initialData.expenseCategory;
        } else if (
          typeof initialData.expenseCategory === "object" &&
          initialData.expenseCategory &&
          "_id" in initialData.expenseCategory
        ) {
          categoryId = (initialData.expenseCategory as { _id: string })._id;
        } else if (initialData.customExpenseCategory) {
          categoryId = "custom";
          setCustomCategoryName(initialData.customExpenseCategory);
        }
      }

      if (type === "income") {
        if (typeof initialData.incomeSource === "string") {
          categoryId = initialData.incomeSource;
        } else if (
          typeof initialData.incomeSource === "object" &&
          initialData.incomeSource &&
          "_id" in initialData.incomeSource
        ) {
          // Use ._id for value, but also set custom name if present
          categoryId = (initialData.incomeSource as { _id: string })._id;
        } else if (initialData.customIncomeSource) {
          categoryId = "custom";
          setCustomCategoryName(initialData.customIncomeSource);
        }
      }

      setFormData({
        amount: initialData.amount.toString(),
        categoryId: categoryId || "",
        date: initialData.date.split("T")[0],
        description: initialData.description || "",
        paymentMethod: initialData.paymentMethod,
      });
    }
  }, [mode, initialData, type]);

  const validate = () => {
    const newErrors = { amount: "", categoryId: "", date: "" };
    let valid = true;

    if (
      !formData.amount ||
      isNaN(Number(formData.amount)) ||
      Number(formData.amount) <= 0
    ) {
      newErrors.amount = "Amount must be a positive number";
      valid = false;
    }

    if (!formData.categoryId.trim()) {
      newErrors.categoryId = "Category/Source is required";
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "paymentMethod" ? (value as PaymentMethod) : value,
    }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    let finalCategoryId = formData.categoryId;
    if (formData.categoryId === "custom" && customCategoryName.trim()) {
      finalCategoryId = customCategoryName.trim();
    }

    const isObjectId = isValidObjectId(finalCategoryId);

    const transactionPayload: Omit<ITransaction, "_id" | "type"> = {
      amount: Number(formData.amount),
      date: formData.date,
      description: formData.description,
      paymentMethod: formData.paymentMethod,
      currency: "USD",
      ...(type === "expense"
        ? isObjectId
          ? { categoryId: finalCategoryId }
          : { customCategory: finalCategoryId }
        : isObjectId
          ? { incomeSource: finalCategoryId }
          : { customIncomeSource: finalCategoryId }),
    };

    try {
      await onSubmit(transactionPayload);
      onClose();
    } catch (error) {
      console.error("Error submitting transaction:", error);
    }
  };

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
          className="absolute top-4 right-4 text-gray-600 hover:text-red-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {mode === "add" ? "Add" : "Edit"}{" "}
          {type === "income" ? "Income" : "Expense"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Amount */}
          <div>
            <label className="block font-medium mb-1">Amount (₹)</label>
            <input
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none ${
                errors.amount ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g. 1000"
            />
            {errors.amount && (
              <p className="text-sm text-red-600 mt-1">{errors.amount}</p>
            )}
          </div>

          {/* Category or Source Dropdown */}
          <CategoryDropdown
            type={type}
            value={formData.categoryId}
            customValue={customCategoryName}
            setValue={(val) =>
              setFormData((prev) => ({ ...prev, categoryId: val }))
            }
            setCustomValue={setCustomCategoryName}
            error={errors.categoryId}
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
          />

          {/* Date */}
          <div>
            <label className="block font-medium mb-1">Date</label>
            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none ${
                errors.date ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.date && (
              <p className="text-sm text-red-600 mt-1">{errors.date}</p>
            )}
          </div>

          {/* Payment Method */}
          <div>
            <label className="block font-medium mb-1">Payment Method</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
            >
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none"
              placeholder="Optional"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
          >
            {mode === "add" ? "Save" : "Update"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default TransactionModal;

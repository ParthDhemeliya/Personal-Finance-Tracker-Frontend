import type { PaymentMethod } from "./commonTypes";

interface BaseTransaction {
  _id: string;
  amount: number;
  date: string;
  description?: string;
  paymentMethod: PaymentMethod;
  currency?: string;
}

// Specific for income
export interface IncomeEntry extends BaseTransaction {
  type: "income";
  incomeSource: string | { _id: string; name: string; color: string } | null;
  customIncomeSource?: string | null;
}

// Specific for expense
export interface ExpenseEntry extends BaseTransaction {
  type: "expense";
  expenseCategory: string; // ObjectId from Category
}

// Union type for usage
export type TransactionEntry = IncomeEntry | ExpenseEntry;

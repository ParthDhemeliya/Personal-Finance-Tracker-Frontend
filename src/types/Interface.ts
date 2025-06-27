import type { PaymentMethod } from "./commonTypes"; 
// export interface IncomeEntry {
//   _id: string;
//   amount: number;
//   category: string;
//   date: string;
//   description?: string;
//   paymentMethod: PaymentMethod;
//   type: "income"; 
// }

// export type PaymentMethod = "cash" | "card" | "bank_transfer" | "other";

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
  incomeSource: string; // ObjectId from Category
}

// Specific for expense
export interface ExpenseEntry extends BaseTransaction {
  type: "expense";
  expenseCategory: string; // ObjectId from Category
}

// Union type for usage
export type TransactionEntry = IncomeEntry | ExpenseEntry;

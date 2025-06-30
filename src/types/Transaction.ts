export type TransactionType = "income" | "expense";

export interface ITransaction {
  _id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  date: string;
  description?: string;
  paymentMethod: "cash" | "card" | "bank_transfer" | "other";
  currency?: string;
  user?: string;
}

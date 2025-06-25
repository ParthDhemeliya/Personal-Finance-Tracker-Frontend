export type TransactionType = "income" | "expense";

export interface Transaction {
  _id: string; 
  type: TransactionType;
  amount: number;
  category: string;
  date: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  user?: string;
}
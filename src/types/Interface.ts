export interface IncomeEntry {
  _id: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
  type?: "income"; 
}
import type { IncomeEntry } from "../types/Interface";
import type { ITransaction } from "../types/Transaction";

export function mapIncomeEntryToTransaction(entry: IncomeEntry): ITransaction {
  return {
    _id: entry._id,
    amount: entry.amount,
    date: entry.date,
    description: entry.description,
    paymentMethod: entry.paymentMethod,
    type: "income",
    // Only set incomeSource and customIncomeSource, not category
    incomeSource:
      typeof entry.incomeSource === "object" && entry.incomeSource !== null
        ? entry.incomeSource._id
        : entry.incomeSource || undefined,
    customIncomeSource: entry.customIncomeSource || undefined,
    currency: entry.currency || "USD",
  };
}

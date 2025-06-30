// import { ITransaction } from "../types/Transaction";
// import { IncomeEntry } from "../types/Interface";

import type { IncomeEntry } from "../types/Interface";
import type { ITransaction } from "../types/Transaction";

export function mapIncomeEntryToTransaction(entry: IncomeEntry): ITransaction {
  return {
    _id: entry._id,
    amount: entry.amount,
    date: entry.date,
    description: entry.description,
    paymentMethod: entry.paymentMethod,
    category:
      typeof entry.incomeSource === "object" && entry.incomeSource !== null
        ? entry.incomeSource._id
        : entry.incomeSource || entry.customIncomeSource || "",
    type: "income",
  };
}

import React from "react";
import { render, screen } from "@testing-library/react";
import TransactionTable from "../TransactionTable";

describe("TransactionTable", () => {
  it("renders with mock data", () => {
    const mockData = [
      {
        _id: "1",
        type: "income",
        amount: 1000,
        date: new Date().toISOString(),
        description: "Salary",
        incomeSource: "Job",
        customIncomeSource: undefined,
        expenseCategory: undefined,
        customExpenseCategory: undefined,
      },
    ];
    render(
      <TransactionTable data={mockData} type="income" onDelete={jest.fn()} />,
    );
    expect(screen.getAllByText("Salary").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Job").length).toBeGreaterThan(0);
  });
});

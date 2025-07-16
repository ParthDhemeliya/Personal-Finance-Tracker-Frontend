import React from "react";
import { render, screen } from "@testing-library/react";
import SpendingPieChart from "../SpendingPieChart";

jest.mock("../../../hooks/useTypedDispatch", () => ({
  useAppDispatch: () => jest.fn(),
}));
jest.mock("../../../hooks/useTypedSelector", () => ({
  useAppSelector: jest.fn(() => ({ data: [], loading: false, error: null })),
}));

describe("SpendingPieChart", () => {
  it("renders the spending by category title", () => {
    render(<SpendingPieChart />);
    expect(screen.getByText("Spending by Category")).toBeInTheDocument();
  });
});

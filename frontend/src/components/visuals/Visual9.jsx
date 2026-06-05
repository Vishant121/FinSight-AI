import React from "react";
import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";

const Visual9 = ({ data }) => {
  const income = data
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const expense = data
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const savings = income - expense;
  const savingsRate = income > 0 ? ((savings / income) * 100).toFixed(1) : 0;

  // Dummy previous month data for now — you can enhance it dynamically
  const previousIncome = 3900;
  const previousExpense = 2220;
  const previousSavingsRate = 46.8;

  const diff = (curr, prev) => curr - prev;
  const percentChange = (curr, prev) => prev === 0 ? 0 : (((curr - prev) / prev) * 100).toFixed(1);

  const statBox = (label, value, diffValue, isPositive, Icon, unit = "₹") => (
    <div className="bg-white rounded-2xl shadow p-4 w-full max-w-xs">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-bold mt-1">{unit}{value.toLocaleString()}</div>
      <div className={`flex items-center mt-2 text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}>
        <Icon className="h-4 w-4 mr-1" />
        {diffValue > 0 ? "+" : ""}{diffValue}
        <span className="text-gray-500 ml-1">from last month</span>
      </div>
    </div>
  );

  return (
    <div className="flex  flex-wrap gap-4 justify-start">
      {statBox(
        "Total Balance",
        savings,
        savings - (previousIncome - previousExpense),
        savings >= previousIncome - previousExpense,
        TrendingUp
      )}
      {statBox(
        "Income",
        income,
        income - previousIncome,
        income >= previousIncome,
        ArrowUpRight
      )}
      {statBox(
        "Expenses",
        expense,
        expense - previousExpense,
        expense < previousExpense,
        ArrowDownRight
      )}
      
    </div>
  );
};

export default Visual9;

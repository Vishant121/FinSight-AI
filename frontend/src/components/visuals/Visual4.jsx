import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Helper to get month-year label like "Jan 2024"
const getMonthYear = (date) => {
  const options = { month: 'short', year: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

const Visual4 = ({ transactions }) => {
  // Group by month-year and sum expenses & income
  const monthlyData = {};

  transactions.forEach(({ date, amount, type }) => {
    const monthYear = getMonthYear(date);
    if (!monthlyData[monthYear]) {
      monthlyData[monthYear] = { month: monthYear, expense: 0, income: 0 };
    }
    if (type === 'expense') {
      monthlyData[monthYear].expense += Number(amount);
    } else if (type === 'income') {
      monthlyData[monthYear].income += Number(amount);
    }
  });

  // Convert to array & sort by date (optional, chronological order)
  const chartData = Object.values(monthlyData).sort((a, b) => {
    return new Date(a.month) - new Date(b.month);
  });

  return (
    <div className="p-4 bg-[#e5e5e5] rounded-2xl shadow-md w-full md:w-[700px]">
      <h2 className="text-xl font-semibold mb-4 text-center">Monthly Expenses vs Income</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => `₹ ${value.toFixed(2)}`} />
          <Legend />
          <Bar dataKey="expense" fill="#FF4C4C" name="Expense" />
          <Bar dataKey="income" fill="#4CAF50" name="Income" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Visual4;

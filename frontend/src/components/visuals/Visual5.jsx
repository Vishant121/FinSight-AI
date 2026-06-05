import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Helper: get month-year label "MMM YYYY"
const getMonthYear = (date) => {
  const options = { month: 'short', year: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

const Visual5 = ({ transactions }) => {
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

  // Convert to sorted array by date
  const chartData = Object.entries(monthlyData)
    .map(([month, values]) => ({ month, ...values }))
    .sort((a, b) => new Date(a.month) - new Date(b.month));

  return (
    <div className="p-4 bg-[#e5e5e5] rounded-2xl shadow-md w-full md:w-[700px]">
      <h2 className="text-xl font-semibold mb-4 text-center">Expense & Income Trend Over Time</h2>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => `₹ ${value.toFixed(2)}`} />
          <Legend />
          <Line type="monotone" dataKey="expense" stroke="#FF4C4C" strokeWidth={2} name="Expense" />
          <Line type="monotone" dataKey="income" stroke="#4CAF50" strokeWidth={2} name="Income" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Visual5;

import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Optional: generate a consistent color for each category
const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042',
  '#A28EFF', '#FF6EC7', '#FFD700', '#7FFFD4',
  '#FF6347', '#ADFF2F', '#20B2AA', '#FF69B4'
];

const Visual2 = ({ transactions }) => {
  // Filter only expense transactions
  const expenseData = transactions.filter(txn => txn.type === 'expense');

  // Group expenses by category
  const dataByCategory = expenseData.reduce((acc, txn) => {
    const { category, amount } = txn;
    if (!acc[category]) acc[category] = 0;
    acc[category] += Number(amount);
    return acc;
  }, {});

  // Format data for Recharts
  const chartData = Object.entries(dataByCategory).map(([category, total]) => ({
    name: category,
    value: total,
  }));

  return (
    <div className="bg-[#e5e5e5] p-4  rounded-2xl shadow-md w-full md:w-[600px]">
      <h2 className="text-xl font-semibold mb-4 text-center">Expense Distribution by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(1)}%`
            }
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `₹ ${value.toFixed(2)}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Visual2;

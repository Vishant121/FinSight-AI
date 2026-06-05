import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = {
  income: '#00C49F',
  saving: '#0088FE',
  expense: '#FF8042'
};

const Visual1 = ({ transactions }) => {
  // Group amounts by type
  const dataByType = transactions.reduce((acc, txn) => {
    const { type, amount } = txn;
    if (!acc[type]) acc[type] = 0;
    acc[type] += Number(amount);
    return acc;
  }, {});

  // Convert to Recharts format
  const chartData = Object.entries(dataByType).map(([type, total]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: total,
    color: COLORS[type] || '#8884d8'
  }));

  return (
    <div className="bg-[#e5e5e5] p-4  rounded-2xl shadow-md w-full md:w-[600px]">
      <h2 className=" text-xl font-semibold mb-4 text-center">Money Distribution by Type</h2>
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
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `₹ ${value.toFixed(2)}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Visual1;

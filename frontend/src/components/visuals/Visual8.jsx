import React from 'react';
import {
  RadialBarChart, RadialBar, Legend, Tooltip, ResponsiveContainer,
} from 'recharts';

const COLORS = [
  '#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d',
  '#a4de6c', '#d0ed57', '#ffc658', '#ff8042',
  '#d88484', '#84d8d8',
];

const Visual8 = ({ transactions, type = 'expense' }) => {
  // Filter by type
  const filtered = transactions.filter(t => t.type.toLowerCase() === type.toLowerCase());

  // Aggregate amount by category
  const categoryMap = {};
  filtered.forEach(({ category, amount }) => {
    categoryMap[category] = (categoryMap[category] || 0) + Number(amount);
  });

  // Transform to array for recharts
  const data = Object.entries(categoryMap).map(([category, total]) => ({
    category,
    value: total,
  }));

  return (
    <div className="p-4 bg-[#e5e5e5] rounded-2xl shadow-md w-full md:w-[600px]">
      <h2 className="text-xl font-semibold mb-4 text-center">
        {type.charAt(0).toUpperCase() + type.slice(1)} by Category
      </h2>
      <ResponsiveContainer width="100%" height={350}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="20%"
          outerRadius="90%"
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <RadialBar
            minAngle={15}
            label={{ position: 'insideStart', fill: '#fff', fontSize: 12 }}
            background
            clockWise
            dataKey="value"
            fill="#8884d8"
          />
          <Legend
            iconSize={10}
            layout="vertical"
            verticalAlign="middle"
            align="right"
            formatter={(value) => <span style={{ fontSize: '14px' }}>{value}</span>}
          />
          <Tooltip formatter={(value) => `₹ ${value.toFixed(2)}`} />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Visual8;

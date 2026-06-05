import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Helper: get month-year label "MMM YYYY"
const getMonthYear = (date) => {
  const options = { month: 'short', year: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

// Generate distinct colors for categories
const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EFF', '#FF6F91',
  '#6BFFB8', '#FF9671', '#FFC75F', '#D65DB1'
];

const Visual6 = ({ transactions }) => {
  // Group data by month and category with amount sum
  const monthlyCategoryData = {};
  const categoriesSet = new Set();

  transactions.forEach(({ date, amount, category }) => {
    const monthYear = getMonthYear(date);
    categoriesSet.add(category);
    if (!monthlyCategoryData[monthYear]) monthlyCategoryData[monthYear] = { month: monthYear };
    if (!monthlyCategoryData[monthYear][category]) monthlyCategoryData[monthYear][category] = 0;
    monthlyCategoryData[monthYear][category] += Number(amount);
  });

  // Convert to array sorted by month
  const chartData = Object.values(monthlyCategoryData)
    .sort((a, b) => new Date(a.month) - new Date(b.month));

  const categories = Array.from(categoriesSet);

  return (
    <div className="p-4 bg-[#e5e5e5] rounded-2xl shadow-md w-full md:w-[700px]">
      <h2 className="text-xl font-semibold mb-4 text-center">Category-wise Monthly Breakdown</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          stackOffset="expand"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => `₹ ${value.toFixed(2)}`} />
          <Legend />
          {categories.map((cat, index) => (
            <Bar
              key={cat}
              dataKey={cat}
              stackId="a"
              fill={COLORS[index % COLORS.length]}
              name={cat}
              isAnimationActive={false}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Visual6;

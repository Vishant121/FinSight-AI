import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

// Helper to format date as 'YYYY-MM-DD' (or as needed)
const formatDate = (date) => {
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

const Visual7 = ({ transactions, type = 'expense' }) => {
  // Filter by type (expense or income)
  const filtered = transactions.filter(t => t.type.toLowerCase() === type.toLowerCase());

  // Sort by date ascending
  filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Calculate cumulative amount
  let cumulative = 0;
  const cumulativeData = filtered.map(({ date, amount }) => {
    cumulative += Number(amount);
    return { date: formatDate(date), cumulativeAmount: cumulative };
  });

  return (
    <div className="p-4 bg-[#e5e5e5] rounded-2xl shadow-md w-full md:w-[700px]">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Cumulative {type.charAt(0).toUpperCase() + type.slice(1)} Over Time
      </h2>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart
          data={cumulativeData}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={type === 'expense' ? '#FF4C4C' : '#4CAF50'} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={type === 'expense' ? '#FF4C4C' : '#4CAF50'} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={(str) => str.slice(5)} />
          <YAxis />
          <Tooltip formatter={(value) => `₹ ${value.toFixed(2)}`} labelFormatter={(label) => `Date: ${label}`} />
          <Area
            type="monotone"
            dataKey="cumulativeAmount"
            stroke={type === 'expense' ? '#FF4C4C' : '#4CAF50'}
            fillOpacity={1}
            fill="url(#colorCumulative)"
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Visual7;

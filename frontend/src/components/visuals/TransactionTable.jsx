import React from 'react';

const TransactionTable = ({ transactions }) => {
  const sortedTransactions = [...transactions].reverse(); // Most recent first

  return (
    <div className="overflow-x-auto p-4 bg-[#003049] rounded-2xl shadow-md w-full max-w-4xl mx-auto">
      <h2 className="text-xl text-white font-semibold mb-4 text-center">Transactions</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
            <th className="border border-gray-300 px-4 py-2 text-right">Amount (₹)</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No transactions to display.
              </td>
            </tr>
          ) : (
            sortedTransactions.map(({ date, amount, type, category }, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="border border-gray-300 px-4 py-2">{new Date(date).toLocaleDateString()}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">₹ {amount}</td>
                <td className="border border-gray-300 px-4 py-2">{type}</td>
                <td className="border border-gray-300 px-4 py-2">{category}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;

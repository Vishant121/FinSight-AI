import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import NewTransactionButton from "./NewTransactionButton";

import Sidebar from "./Sidebar";
import axios from "axios";
import Visual1 from "./visuals/Visual1";
import Visual2 from "./visuals/Visual2";
import Visual3 from "./visuals/Visual3";
import Visual4 from "./visuals/Visual4";
import Visual5 from "./visuals/Visual5";
import Visual6 from "./visuals/Visual6";
import Visual7 from "./visuals/Visual7";
import Visual8 from "./visuals/Visual8";
import Visual9 from "./visuals/Visual9";
import TransactionTable from "./visuals/TransactionTable";

const COLORS = [
  "#34d399",
  "#60a5fa",
  "#fbbf24",
  "#f87171",
  "#a78bfa",
  "#d1d5db",
];

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

  const [timeFrame, setTimeFrame] = useState("all"); // Options: 'all', 'month', '6months', 'year', 'custom'
  const [customRange, setCustomRange] = useState({ from: null, to: null });

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:5001/api/transactions")
        .then((response) => {
          const processedData = response.data.map((item) => ({
            ...item,
            amount: parseFloat(item.amount),
            year: parseInt(item.year),
            date: new Date(
              item.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3")
            ),
          }));
          setTransactions(processedData);
          console.log("✅ Updated data:", processedData);
        })
        .catch((error) => {
          console.error("Error fetching transactions:", error);
        });
    };

    // Initial fetch
    fetchData();

    // Poll every 5 seconds (5000ms)
    const interval = setInterval(fetchData, 3000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  const now = new Date();
  let filteredData = transactions;

  if (timeFrame === "month") {
    filteredData = transactions.filter(
      (t) =>
        t.date.getMonth() === now.getMonth() &&
        t.date.getFullYear() === now.getFullYear()
    );
  } else if (timeFrame === "6months") {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(now.getMonth() - 6);
    filteredData = transactions.filter(
      (t) => t.date >= sixMonthsAgo && t.date <= now
    );
  } else if (timeFrame === "year") {
    filteredData = transactions.filter(
      (t) => t.date.getFullYear() === now.getFullYear()
    );
  } else if (timeFrame === "custom" && customRange.from && customRange.to) {
    filteredData = transactions.filter(
      (t) => t.date >= customRange.from && t.date <= customRange.to
    );
  }

  return (
    <>
    <div className="font-['Poppins']">
      <div className="flex">
        <div>
          <Sidebar />
        </div>

        <div id="dashboard" className="  ml-64 p-6 w-full overflow-y-auto">
          <div class=" bg-[#003049] flex items-center justify-between p-6 rounded-xl">
            <div>
              <h1 class="text-5xl font-bold text-[#e5e5e5]">
                Finance Dashboard
              </h1>
              <p class="text-[#e5e5e5]">
                Manage your finances and track your spending
              </p>
            </div>

            <div className="bg-orange-400 text-black hover:bg-orange-500  p-3 rounded-xl ">
              <NewTransactionButton />
            </div>
          </div>
          <div className="p-3 bg-orange-300   m-2 rounded-md w-auto float-right">
            <select onChange={(e) => setTimeFrame(e.target.value)}>
              <option value="all">All Time</option>
              <option value="month">This Month</option>
              <option value="6months">Last 6 Months</option>
              <option value="year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
            {timeFrame === "custom" && (
              <>
                <input
                  type="date"
                  onChange={(e) =>
                    setCustomRange((prev) => ({
                      ...prev,
                      from: new Date(e.target.value),
                    }))
                  }
                />
                <input
                  type="date"
                  onChange={(e) =>
                    setCustomRange((prev) => ({
                      ...prev,
                      to: new Date(e.target.value),
                    }))
                  }
                />
              </>
            )}
          </div>
          <div className="mt-5 ">
            <Visual9 data={filteredData} />
          </div>

          <div className="flex mt-5 gap-3 items-center">
            <Visual4 transactions={filteredData} />
            <div className="">
              <Visual1 transactions={filteredData} />
            </div>
          </div>
          <div className="flex justify-center pt-4">
            <div>
              <Visual5 transactions={filteredData} />
            </div>
          </div>

          <div className="flex  gap-3 items-center pt-4">
            <Visual2 transactions={filteredData} />

            <div>
              <Visual3 transactions={filteredData} />
            </div>
          </div>

          <div></div>

          <div className="flex pt-4 items-center gap-3">
            {" "}
            <Visual6 transactions={filteredData} />
            <Visual7 transactions={filteredData} type="expense" />
          </div>
        </div>
      </div>

      <section id="transactions" className="mt-20 ml-45 mb-20">
        <TransactionTable transactions={filteredData} />
      </section>

      <div className=""></div>
      </div>
    </>
  );
};

export default Dashboard;

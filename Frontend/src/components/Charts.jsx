import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const ExpenseCharts = ({ expenses = [] }) => {
  const categoryData = (expenses || []).reduce((acc, expense) => {
    if (acc[expense.category]) {
      acc[expense.category] += expense.amount;
    } else {
      acc[expense.category] = expense.amount;
    }
    return acc;
  }, {});

  const categoryLabels = Object.keys(categoryData);
  const categoryValues = Object.values(categoryData);

  const pieChartData = {
    labels: categoryLabels,
    datasets: [
      {
        data: categoryValues,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const monthlyData = (expenses || []).reduce((acc, expense) => {
    const month = new Date(expense.date).toLocaleString("default", {
      month: "short",
    }); // Get month in short form
    if (acc[month]) {
      acc[month] += expense.amount;
    } else {
      acc[month] = expense.amount;
    }
    return acc;
  }, {});

  const months = Object.keys(monthlyData);
  const monthlyAmounts = Object.values(monthlyData);

  const lineChartData = {
    labels: months,
    datasets: [
      {
        label: "Monthly Expense Comparison",
        data: monthlyAmounts,
        fill: false,
        borderColor: "#FF9F40",
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: "#FF9F40",
        pointBorderColor: "#fff",
        pointRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount (₹)",
        },
      },
    },
  };

  return (
    <div style={{ width: "90%", margin: "0 auto", padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: "1 1 45%",
            boxSizing: "border-box",
            minHeight: "300px",
            backgroundColor: "#f9f9f9",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
            Monthly Expense Comparison
          </h3>
          <Line data={lineChartData} options={chartOptions} />
        </div>

        <div
          style={{
            flex: "1 1 45%",
            boxSizing: "border-box",
            minHeight: "300px",
            backgroundColor: "#f9f9f9",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
            Expense Breakdown by Category
          </h3>
          <Pie data={pieChartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default ExpenseCharts;

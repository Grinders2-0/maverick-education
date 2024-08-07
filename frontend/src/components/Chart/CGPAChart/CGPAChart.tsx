import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { colors } from "../../../util/constant/colors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface CGPAChartProps {
  data: {
    labels: string[];
    values: number[];
  };
  style?: React.CSSProperties;
}

const CGPAChart: React.FC<CGPAChartProps> = ({ data, style }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "CGPA",
        data: data.values,
        backgroundColor: `${colors.red}30`,
        borderColor: colors.red,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensure the chart fills the container

    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `CGPA: ${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Semester",
        },
      },
      y: {
        title: {
          display: true,
          text: "CGPA",
        },
        min: 5,
        max: 10,
      },
    },
  };

  return (
    <div
      style={{
        ...style,
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        padding: "20px",
        position: "relative", // Ensure proper layout
        overflow: "hidden", // Hide overflow
      }}
    >
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default CGPAChart;

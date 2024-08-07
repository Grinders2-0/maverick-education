import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { colors } from "../../../util/constant/colors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SPIChartProps {
  data: {
    labels: string[];
    values: number[];
  };
  style?: React.CSSProperties;
}

const SPIChart: React.FC<SPIChartProps> = ({ data, style }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "SPI",
        data: data.values,
        borderColor: "green",
        backgroundColor: `${colors.primary}30`, // Adjust alpha for shading
        borderWidth: 2,
        pointRadius: 5,
        fill: true, // Enable shading below the line
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
          label: (tooltipItem: any) => `SPI: ${tooltipItem.raw}`,
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
          text: "SPI",
        },
        min: 1,
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
      <div style={{ width: "100%", height: "100%" }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default SPIChart;

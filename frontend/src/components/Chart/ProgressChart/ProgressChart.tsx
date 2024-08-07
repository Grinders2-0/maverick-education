import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

// Define the props for the ProgressChart component
interface ProgressChartProps {
  progress: number; // The progress percentage to display (0-100)
  color?: string; // Optional: Color for the progress arc
  backgroundColor?: string; // Optional: Color for the background arc
}

const ProgressChart: React.FC<ProgressChartProps> = ({
  progress,
  color = "#36A2EB", // Default progress color
  backgroundColor = "#E0E0E0", // Default background color
}) => {
  // Define the data for the Doughnut chart
  const data = {
    datasets: [
      {
        data: [progress, 100 - progress], // The progress and remaining
        backgroundColor: [color, backgroundColor], // Colors for the chart
        borderWidth: 0, // No border
      },
    ],
  };

  // Define the options for the Doughnut chart
  const options: ChartOptions<"doughnut"> = {
    cutout: "70%", // Adjust the cutout size for the center
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: false, // Disable tooltips
      },
    },
  };

  return (
    <div
      style={{
        position: "relative",
        width: 200,
        height: 200,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        padding: 30,
        borderRadius: 10,
      }}
    >
      <Doughnut data={data} options={options} />
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{ fontSize: 24, fontWeight: "bold" }}
        >{`${progress}%`}</span>
      </div>
    </div>
  );
};

export default ProgressChart;

// TimelineChart.tsx
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
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns"; // Import date adapter for time scale
import { colors } from "../../../util/constant/colors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const TimelineChart: React.FC = () => {
  // Generate a list of dates for the past four months
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 4);

  const generateDateRange = (start: Date, end: Date): string[] => {
    const dateArray: string[] = [];
    let currentDate = new Date(start);
    while (currentDate <= end) {
      dateArray.push(currentDate.toISOString().split("T")[0]); // Format as YYYY-MM-DD
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  };

  const labels = generateDateRange(startDate, new Date());

  // Generate random data for each day
  const generateRandomData = (num: number) => {
    return Array.from({ length: num }, () => Math.floor(Math.random() * 100));
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Daily Usage",
        data: generateRandomData(labels.length),
        borderColor: colors.secondary,
        backgroundColor: colors.highlightBackground,
        fill: true,
        tension: 0.4, // Curved line
        pointRadius: 3, // Size of the points on the line
        pointHoverRadius: 5, // Size of the points on hover
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow control over width and height
    scales: {
      x: {
        type: "time" as const, // Use time scale for x-axis
        time: {
          unit: "day" as const, // Ensure this is a valid literal type
        },
        title: {
          display: true,
          text: "Date",
          color: "#333", // Change axis title color
        },
        ticks: {
          color: "#555", // Change axis label color
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Usage",
          color: "#333", // Change axis title color
        },
        ticks: {
          color: "#555", // Change axis label color
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top" as const, // Ensure this is a valid literal type
        labels: {
          color: "#333", // Change legend text color
          font: {
            size: 14, // Increase font size for legend
          },
        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
  };

  return (
    <div
      style={{
        width: "100vh",
        height: "600px",
        margin: "0 auto",
        position: "relative",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Elevation effect
        borderRadius: "10px", // Rounded corners for a softer look
        backgroundColor: "#fff", // Optional: background color for contrast
        marginRight: 20,
        padding: 15,
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
};

export default TimelineChart;

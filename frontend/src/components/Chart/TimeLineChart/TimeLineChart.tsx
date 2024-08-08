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
import annotationPlugin, { AnnotationOptions } from "chartjs-plugin-annotation";
import "chartjs-adapter-date-fns"; // Import date adapter for time scale
import { colors } from "../../../util/constant/colors";

// Register plugins and scales
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  annotationPlugin
);

const TimelineChart: React.FC = () => {
  // Generate a list of dates for every week in the past four months
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 4);

  const generateWeeklyDateRange = (start: Date, end: Date): string[] => {
    const dateArray: string[] = [];
    let currentDate = new Date(start);
    while (currentDate <= end) {
      dateArray.push(currentDate.toISOString().split("T")[0]); // Format as YYYY-MM-DD
      currentDate.setDate(currentDate.getDate() + 7); // Move to next week
    }
    return dateArray;
  };

  const labels = generateWeeklyDateRange(startDate, new Date());

  // Generate random data for each week
  const generateRandomData = (num: number) => {
    return Array.from({ length: num }, () => Math.floor(Math.random() * 100));
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Weekly Usage",
        data: generateRandomData(labels.length),
        borderColor: "orange",
        backgroundColor: colors.highlightBackground,
        fill: true,
        tension: 0.4, // Curved line
        pointRadius: 3, // Size of the points on the line
        pointHoverRadius: 5, // Size of the points on hover
      },
    ],
  };

  // Calculate mid-semester and end-semester dates
  const midSemDate = new Date();
  midSemDate.setMonth(startDate.getMonth() + 2); // Mid-semester exam after 2 months

  const endSemDate = new Date();
  endSemDate.setMonth(startDate.getMonth() + 4); // End-semester exam after 4 months

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow control over width and height
    scales: {
      x: {
        type: "time" as const, // Use time scale for x-axis
        time: {
          unit: "week" as const, // Use weeks for x-axis units
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
      annotation: {
        annotations: {
          currentDay: {
            type: "line",
            xMin: new Date().toISOString().split("T")[0],
            xMax: new Date().toISOString().split("T")[0],
            borderColor: "red",
            borderWidth: 2,
            label: {
              content: "Today",
              enabled: true,
              position: "start",
              backgroundColor: "red",
              color: "#fff",
            },
          } as AnnotationOptions<"line">,
          midSem: {
            type: "box",
            xMin: new Date(midSemDate).toISOString().split("T")[0],
            xMax: new Date(midSemDate.setDate(midSemDate.getDate() + 7))
              .toISOString()
              .split("T")[0], // 1-week duration
            backgroundColor: "rgba(255, 206, 86, 0.2)",
            borderColor: "rgba(255, 206, 86, 1)",
            borderWidth: 1,
            label: {
              content: "Mid-Sem Exams",
              enabled: true,
              position: "center",
              backgroundColor: "rgba(255, 206, 86, 0.6)",
              color: "#333",
            },
          } as AnnotationOptions<"box">,
          endSem: {
            type: "box",
            xMin: new Date(endSemDate).toISOString().split("T")[0],
            xMax: new Date(endSemDate.setDate(endSemDate.getDate() + 7))
              .toISOString()
              .split("T")[0], // 1-week duration
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
            label: {
              content: "End-Sem Exams",
              enabled: true,
              position: "center",
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              color: "#333",
            },
          } as AnnotationOptions<"box">,
        },
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

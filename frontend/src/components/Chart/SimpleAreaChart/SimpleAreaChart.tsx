import * as React from "react";
import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";
import { colors } from "../../../util/constant/colors"; // Ensure this path is correct

const spiData = [6, 7, 5, 8, 7, 8.8, 9, 8]; // Example SPI data for Sem 1 to Sem 8
const semesters = [
  "Sem 1",
  "Sem 2",
  "Sem 3",
  "Sem 4",
  "Sem 5",
  "Sem 6",
  "Sem 7",
  "Sem 8",
];

export default function SimpleAreaChart() {
  return (
    <div
      style={{
        width: 500,
        height: 300,
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <LineChart
        series={[
          {
            data: spiData,
            label: "SPI",
            area: true,
            showMark: false,
            color: colors.accent, // Use the correct property for line color
          },
        ]}
        xAxis={[{ scaleType: "point", data: semesters }]}
        yAxis={[{ scaleType: "linear", min: 1, max: 10 }]} // Set the y-axis range from 1 to 10
        sx={{
          // Apply styles to the chart container
          [`& .${lineElementClasses.root}`]: {
            backgroundColor: "transparent", // Ensure the background is transparent or adjusted as needed
          },
          // Apply additional styles if needed
        }}
      />
    </div>
  );
}

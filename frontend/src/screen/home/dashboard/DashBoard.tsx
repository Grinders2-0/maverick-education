import React, { memo } from "react";
import TimelineChart from "../../../components/Chart/TimeLineChart/TimeLineChart";
import CGPAChart from "../../../components/Chart/CGPAChart/CGPAChart";
import SPIChart from "../../../components/Chart/SPIChart/SPIChart";
import { colors } from "../../../util/constant/colors";

const DashBoard = () => {
  const spiData = {
    labels: [
      "Semester 1",
      "Semester 2",
      "Semester 3",
      "Semester 4",
      "Semester 5",
      "Semester 6",
      "Semester 7",
      "Semester 8",
    ],
    values: [8, 7.5, 9, 8.2, 8.8, 9.1, 7.9, 8.4],
  };

  const cgpaData = {
    labels: ["Semester 5", "Semester 6", "Semester 7", "Semester 8"],
    values: [8.5, 8.7, 8.8, 9.0],
  };

  return (
    <div
      style={{
        background: colors.highlightBackground,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginRight: 20,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            height: 45,
            width: 45,
            borderRadius: 1000,
            marginRight: 10,
            background: colors.accent,

            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <h4 style={{ color: "white" }}>J</h4>
        </div>
        <label>Jeneesh S.</label>
      </div>
      <div
        style={{
          flexDirection: "row",
          display: "flex",
        }}
        className=""
      >
        <TimelineChart />
        <div
          style={{
            marginRight: 20,
            flexDirection: "column",
            display: "flex",
          }}
        >
          <SPIChart
            data={spiData}
            style={{
              width: "350px",
              marginBottom: 20,
              display: "flex",
              flex: 1,
            }}
          />

          <CGPAChart
            data={cgpaData}
            style={{ width: "350px", display: "flex", flex: 1 }}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(DashBoard);

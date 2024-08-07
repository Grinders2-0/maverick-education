import React, { useEffect, useState } from "react";
import DashBoard from "./dashboard/DashBoard";
import Drawer from "./drawer/Drawer";
import { colors } from "../../util/constant/colors";
import Subject from "../subject/Subject";
import Course from "../Course/Course";
import { useAppDispatch } from "../../redux/app/store";
import { getAllResultData } from "../../redux/action/form/collegeForm";

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(getAllResultData((success) => {}));
  }, []);
  const [selectedLabel, setSelectedLabel] = useState<string>("Dashboard");

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        background: colors.cardPanelBackground,
        height: "100vh",
        flexDirection: "row",
      }}
    >
      <section
        style={{
          width: "20%",
          padding: 20,
          margin: 25,
          borderRadius: 20,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Add shadow for elevation
          background: colors.accent,
          flexShrink: 0, // Prevent the drawer from shrinking
        }}
      >
        <Drawer
          selectedLabel={selectedLabel}
          setSelectedLabel={setSelectedLabel}
        />
      </section>
      <section
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          marginTop: 25,
          background: colors.cardPanelBackground,
          overflowY: "auto", // Enable vertical scrolling
          padding: "0 20px", // Optional padding for aesthetics
          overflowX: "hidden", // Prevent horizontal scrolling
        }}
      >
        {selectedLabel === "Dashboard" && <DashBoard />}
        {selectedLabel === "Subjects" && <Subject />}
        {selectedLabel === "Courses" && <Course />}
      </section>
    </div>
  );
};

export default Home;

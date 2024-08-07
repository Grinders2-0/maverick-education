import React from "react";
import DashBoard from "./dashboard/DashBoard";
import Drawer from "./drawer/Drawer";
import { colors } from "../../util/constant/colors";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        background: colors.BackgroundColor,
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
        }}
      >
        <Drawer />
      </section>
      <section>
        <DashBoard />
      </section>
    </div>
  );
};

export default Home;

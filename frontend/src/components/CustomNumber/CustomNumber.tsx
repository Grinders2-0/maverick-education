import React, { memo } from "react";
import "./CustomNumber.css";
import { colors } from "../../util/constant/colors";
type props = {
  no?: string;
  title?: string;
  selected?: boolean;
};
const CustomNumber = ({ no, title, selected }: props) => {
  return (
    <div
      className="aa"
      style={{
        flexDirection: "row",
        alignItems: "center",
        display: "flex",
        paddingBottom: 20,

      }}
    >
      <div
        className="aa"
        style={{
          height: 70,
          width: 70,
          borderRadius: 1000,
          backgroundColor: selected ? colors.circleColor : "transparent",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          borderWidth: selected ? 0 : 2,
          borderColor: colors.circleColor,
          borderStyle: "solid",
        }}
      >
        <label
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: selected ? "#000" : colors.circleColor,
          }}
        >
          {no}
        </label>
      </div>
      <div
        style={{
          flexDirection: "column",
          display: "flex",
          marginLeft: 20,
        }}
      >
        <label
          style={{
            fontSize: 20,
            fontWeight: "lighter",
            color: colors.DarkBorder,
            letterSpacing: 0.8,
          }}
        >
          STEP {no}
        </label>
        <label
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: colors.white,
            letterSpacing: 0.8,
          }}
        >
          {title}
        </label>
      </div>
    </div>
  );
};

export default memo(CustomNumber);

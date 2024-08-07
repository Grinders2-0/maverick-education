import React, { memo } from "react";
import { colors } from "../../util/constant/colors";

type props = {
  image?: string | undefined;
  title?: string | undefined;
  isSelected?: boolean | undefined;
  onClick?: () => void;
};
const DrawerLabel = ({ image, title, isSelected, onClick }: props) => {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        background: isSelected ? colors.accent : "transparent",
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 10,
        paddingLeft: 20,
        marginBottom: 10,
        boxShadow: isSelected ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none", // Add shadow for elevation
      }}
    >
      <div
        style={{
          marginRight: 15,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 5,
        }}
      >
        <img
          src={image}
          style={{
            height: "auto",
            width: 20,
            filter: isSelected ? "invert(1) brightness(100)" : "none", // Apply filter conditionally
          }}
        />
      </div>
      <div style={{ color: isSelected ? colors.white : colors.black }}>
        <label>{title}</label>
      </div>
    </div>
  );
};

export default memo(DrawerLabel);

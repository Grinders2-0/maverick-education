import React, { CSSProperties } from "react";
import { colors } from "../../../util/constant/colors";

type Props = {
  styles?: CSSProperties;
};

const Circle: React.FC<Props> = ({ styles }) => {
  const defaultStyles: CSSProperties = {
    position: "absolute",
    height: 150,
    width: 150,
    borderRadius: 1000,
    backgroundColor: colors[400],
    zIndex: -1,
  };

  return <div style={{ ...defaultStyles, ...styles }} />;
};

export default Circle;

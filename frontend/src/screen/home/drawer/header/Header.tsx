import React, { memo } from "react";
import { images } from "../../../../util/constant/images";
import { colors } from "../../../../util/constant/colors";

const Header = () => {
  return (
    <div
      style={{
        paddingTop: 10,
        paddingBottom: 30,
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        background: colors.accent,
      }}
    >
      <img src={images.Google} style={{ height: 30, width: 30 }} />
      <div style={{ marginLeft: 10 }}>
        <label style={{ color: colors.white, letterSpacing: 0.7 }}>
          NextGenLearn
        </label>
      </div>
    </div>
  );
};

export default memo(Header);

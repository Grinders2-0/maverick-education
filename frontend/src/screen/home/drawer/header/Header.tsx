import React, { memo } from "react";
import { images } from "../../../../util/constant/images";

const Header = () => {
  return (
    <div
      style={{
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        marginBottom: 30,
      }}
    >
      <img src={images.Google} style={{ height: 30, width: 30 }} />
      <div style={{ marginLeft: 10 }}>
        <label>NextGenLearn</label>
      </div>
    </div>
  );
};

export default memo(Header);

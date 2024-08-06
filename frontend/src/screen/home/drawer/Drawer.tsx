import React, { memo } from "react";
import Header from "./header/Header";
import Body from "./body/Body";

const Drawer = () => {
  return (
    <div>
      <Header />
      <Body />
    </div>
  );
};

export default memo(Drawer);

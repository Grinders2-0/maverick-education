import React, { memo } from "react";
import Header from "./header/Header";
import Body from "./body/Body";
import { colors } from "../../../util/constant/colors";
type props = {
  selectedLabel?: string;
  setSelectedLabel?: (a: string) => void;
};
const Drawer = ({ selectedLabel, setSelectedLabel }: props) => {
  return (
    <div style={{ background: colors.white }}>
      <Header />
      <Body selectedLabel={selectedLabel} setSelectedLabel={setSelectedLabel} />
    </div>
  );
};

export default memo(Drawer);

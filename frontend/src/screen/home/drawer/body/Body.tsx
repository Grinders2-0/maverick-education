import React, { memo } from "react";
import DrawerLabel from "../../../../components/Drawer/DrawerLabel";
import { images } from "../../../../util/constant/images";

const Body = () => {
  return (
    <div>
      <DrawerLabel image={images.DashBoard1} title="DashBoard" isSelected />
      <DrawerLabel
        image={images.DashBoard1}
        title="DashBoard"
        isSelected={false}
      />
    </div>
  );
};

export default memo(Body);

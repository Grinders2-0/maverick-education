import React, { CSSProperties, memo } from "react";
import CustomButton from "../CustomButton/CustomButton";
import { images } from "../../util/constant/images";
import { colors } from "../../util/constant/colors";

type props = {
  onClick?: () => void;
  sname?: string;
  buttonText?: string | undefined;
  style?: CSSProperties | undefined;
  buttonStyle?: CSSProperties | undefined;
  isDash?: boolean | undefined;
};
const ShowCourse = ({
  onClick,
  sname,
  buttonText,
  style,
  buttonStyle,
  isDash = false,
}: props) => {
  return (
    <div
      style={{
        height: 100,
        borderRadius: 10,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        padding: 25,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 30,
        backgroundImage: isDash ? colors.white : `url(${images.courseBG})`,
        backgroundSize: "cover", // Cover the entire div
        backgroundPosition: "center", // Center the image
        backgroundRepeat: "no-repeat", // Do not repeat the image

        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flex: 1,
          paddingLeft: 10,
        }}
      >
        <label
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: isDash ? colors.black : colors.white,
          }}
        >
          {sname}
        </label>
      </div>

      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <CustomButton
          onClick={onClick}
          text={buttonText ? buttonText : "Learn"}
          style={{
            background: isDash ? colors.black : colors.white,
            color: isDash ? colors.white : colors.black,
            fontWeight: "bold",
            marginLeft: 30,
            marginRight: 10,
            ...buttonStyle,
          }}
        />
      </div>
    </div>
  );
};

export default memo(ShowCourse);

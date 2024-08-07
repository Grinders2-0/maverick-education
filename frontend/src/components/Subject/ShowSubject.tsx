import React, { CSSProperties, memo } from "react";
import CustomButton from "../CustomButton/CustomButton";
import { images } from "../../util/constant/images";
import { colors } from "../../util/constant/colors";

type props = {
  onClick?: () => void;
  sname?: string;
  scode?: string;
  buttonText?: string | undefined;
  style?: CSSProperties | undefined;
  buttonStyle?: CSSProperties | undefined;
};
const ShowSubject = ({
  onClick,
  scode,
  sname,
  buttonText,
  style,
  buttonStyle,
}: props) => {
  return (
    <div
      style={{
        height: 200,
        width: 240,
        borderRadius: 30,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        padding: 25,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: 30,
        backgroundImage: `url(${images.subjectBG})`,
        backgroundSize: "cover", // Cover the entire div
        backgroundPosition: "center", // Center the image
        backgroundRepeat: "no-repeat", // Do not repeat the image
        ...style,
      }}
    >
      <div>
        <div>
          <label
            style={{ fontSize: 20, fontWeight: "bold", color: colors.white }}
          >
            {sname}
          </label>
        </div>
        <div>
          <label style={{ color: colors.white }}>{"(" + scode + ")"}</label>
        </div>
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
          text={buttonText ? buttonText : "Explore"}
          style={{
            background: colors.white,
            color: colors.black,
            fontWeight: "bold",
            ...buttonStyle,
          }}
        />
      </div>
    </div>
  );
};

export default memo(ShowSubject);

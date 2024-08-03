import React from "react";
import { colors } from "../../../util/constant/colors";
import ImageUpload from "../../../components/ImageUPload/ImageUpload";
import SelectInput from "@mui/material/Select/SelectInput";
import CustomButton from "../../../components/CustomButton/CustomButton";
import CustomInput from "../../../components/CustomInput/CustomInput";
import TextButton from "../../../components/TextButton/TextButton";

type props = {
  onNextPress?: () => void;
  onBackPrees?: () => void;
};
const SemesterDetail = ({ onNextPress, onBackPrees }: props) => {
  const onBoxPress = () => {};
  return (
    <section
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: "60%",
        marginRight: "10%",
        // background: "#00000040",
      }}
    >
      <h1
        style={{
          marginBottom: 0,
          textAlign: "left",
          fontSize: 42,
          color: colors.accent,
        }}
      >
        Result Details
      </h1>
      <div style={{ marginBottom: 30 }}>
        <label
          style={{
            textAlign: "left",
            fontSize: 20,
            color: colors.black8,
          }}
        >
          Please upload your results based on given
        </label>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <div>
          <TextButton
            text="Back"
            onClick={onBackPrees}
            className="custom-button-class"
            style={{ alignItems: "center" }}
            textStyle={{
              color: colors.accent,
              fontSize: 18,
              fontWeight: "normal",
            }}
          />
        </div>
        <CustomButton
          text="Next"
          style={{
            marginTop: 20,
            backgroundColor: colors.accent,
            paddingLeft: 30,
            paddingRight: 30,
          }}
          onClick={onNextPress}
        />
      </div>
    </section>
  );
};

export default SemesterDetail;

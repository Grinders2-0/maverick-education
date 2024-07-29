import React, { memo } from "react";
import { colors } from "../../util/constant/colors";
import { images } from "../../util/constant/images";
import CollegeForm from "./CollegeForm/CollegeForm";
import SemesterDetail from "./SemesterDetail/SemesterDetail";
import "./Form.css";
const Form = () => {
  return (
    <div style={{ height: "100vh" }}>
      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "90%",
        }}
      >
        <CollegeForm />
      </section>
    </div>
  );
};

export default memo(Form);

import React, { memo } from "react";
import "./Form.css";
import { colors } from "../../util/constant/colors";
import { images } from "../../util/constant/images";
import CollegeForm from "./CollegeForm/CollegeForm";
import SemesterDetail from "./SemesterDetail/SemesterDetail";

const Form = () => {
  return (
    <div className="container" style={{}}>
      <section
        className="login-container"
        style={{
          // backgroundImage: `url(${images.bgImage2})`,
          // backgroundSize: "cover",
          // backgroundPosition: "center",
          // opacity: 0.8,
          backgroundColor: colors.BackgroundColor,
        }}
      >
        <CollegeForm />
      </section>
      {/* <section className="signup-container"> */}
      {/* <SemesterDetail />
      </section> */}
    </div>
  );
};

export default memo(Form);

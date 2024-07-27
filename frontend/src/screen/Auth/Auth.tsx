import React, { memo } from "react";
import Login from "./login/Login";
import SignUp from "./sign up/SignUp";
import "./Auth.css";
import { colors } from "../../util/constant/colors";
import { images } from "../../util/constant/images";

const Auth = () => {
  return (
    <div className="container" style={{}}>
      <section
        className="login-container"
        style={{
          backgroundImage: `url(${images.bgImage1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.8,
        }}
      >
        <Login />
      </section>
      <section
        className="signup-container"
        // style={{
        //   backgroundImage: `url(${images.signupImage})`,
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        //   opacity: 0.7,
        // }}
      >
        <SignUp />
      </section>
    </div>
  );
};

export default memo(Auth);

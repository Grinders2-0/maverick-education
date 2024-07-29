import React, { memo, useEffect, useState } from "react";
import { colors } from "../../util/constant/colors";
import { images } from "../../util/constant/images";
import CollegeForm from "./CollegeForm/CollegeForm";
import SemesterDetail from "./SemesterDetail/SemesterDetail";
import "./Form.css";
import CustomNumber from "../../components/CustomNumber/CustomNumber";

const Form = () => {
  const [selectedNo, setSelectedNo] = useState<number>(1);
  useEffect(() => {
    // Add no-scroll class to body when the component mounts
    document.body.classList.add("no-scroll");

    // Remove no-scroll class from body when the component unmounts
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);
  return (
    <div style={{ height: "100vh", display: "flex" }}>
      <div
        className="bgImage"
        style={{
          height: "92%",
          backgroundImage: `url(${images.FormImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "25%",
          borderRadius: 25,
          margin: 30,
          padding: 20,
        }}
      >
        <section style={{ padding: 20, paddingTop: 30 }}>
          <div style={{}}>
            <CustomNumber
              no="1"
              title="College Detail"
              selected={selectedNo == 1}
            />
          </div>
          <div style={{}}>
            <CustomNumber
              no="2"
              title="Result Detail"
              selected={selectedNo == 2}
            />
          </div>
          <div style={{}}>
            <CustomNumber no="3" title="Survey" selected={selectedNo == 3} />
          </div>
          {/* <div style={{}}>
            <CustomNumber no="4" title="College Form" selected={selectedNo==4} />
          </div> */}
        </section>
      </div>
      <CollegeForm />
    </div>
  );
};

export default memo(Form);

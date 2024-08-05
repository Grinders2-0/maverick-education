import React, { memo, useEffect, useState } from "react";
import { colors } from "../../util/constant/colors";
import { images } from "../../util/constant/images";
import CollegeForm from "./CollegeForm/CollegeForm";
import SemesterDetail from "./SemesterDetail/SemesterDetail";
import "./Form.css";
import CustomNumber from "../../components/CustomNumber/CustomNumber";
import { useNavigate } from "react-router-dom";
import SelectSubject from "./SelectSubject/SelectSubject";
import Servey from "./Servey/Servey";

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
  const onNextPress1 = () => {
    setSelectedNo(2);
  };
  const onNextPress2 = () => {
    setSelectedNo(3);
  };
  const onNextPress3 = () => {
    setSelectedNo(4);
  };
  const onNextPress4 = () => {
    // setSelectedNo(4);
  };
  const onBackPrees2 = () => {
    setSelectedNo(1);
  };
  const onBackPrees3 = () => {
    setSelectedNo(2);
  };
  const onBackPrees4 = () => {
    setSelectedNo(3);
  };
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
              title="Select Subject"
              selected={selectedNo == 2}
            />
          </div>
          <div style={{}}>
            <CustomNumber
              no="3"
              title="Result Detail"
              selected={selectedNo == 3}
            />
          </div>
          <div style={{}}>
            <CustomNumber no="4" title="Survey" selected={selectedNo == 4} />
          </div>
        </section>
      </div>
      <div
        style={{
          // background:'#00000020',
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {selectedNo == 1 && <CollegeForm onNextPress={onNextPress1} />}
        {selectedNo == 2 && (
          <SelectSubject
            onNextPress={onNextPress2}
            onBackPrees={onBackPrees2}
          />
        )}
        {selectedNo == 3 && (
          <SemesterDetail
            onNextPress={onNextPress3}
            onBackPrees={onBackPrees3}
          />
        )}
        {selectedNo == 4 && (
          <Servey onNextPress={onNextPress4} onBackPrees={onBackPrees4} />
        )}
      </div>
    </div>
  );
};

export default memo(Form);

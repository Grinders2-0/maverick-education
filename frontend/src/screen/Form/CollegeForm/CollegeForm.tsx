import React, { memo, useState } from "react";
import CustomInput from "../../../components/CustomInput/CustomInput";
import SelectInput from "../../../components/SelectInput/SelectInput";
import collegeData from "../../../assets/data/collegeData.json";
import departmentList from "../../../assets/data/departmentData.json";
import yearList from "../../../assets/data/yearData.json";
import semester from "../../../assets/data/semester.json";

import "./CollegeForm.css";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { images } from "../../../util/constant/images";
import { colors } from "../../../util/constant/colors";

type props = {
  onNextPress?: () => void;
};
const CollegeForm = ({ onNextPress }: props) => {
  const [clgName, setClgName] = useState<string>("");
  const [depart, setDepart] = useState<string>("");
  const [enrollNo, setEnrollNo] = useState<string>("");
  const [enrollYear, setEnrollYear] = useState<string>("");
  const [graduationYear, setGraduationYear] = useState<string>("");

  const [clgNameError, setClgNameError] = useState<string>("");
  const [departError, setDepartError] = useState<string>("");
  const [enrollNoError, setEnrollNoError] = useState<string>("");
  const [enrollYearError, setEnrollYearError] = useState<string>("");
  const [graduationYearError, setGraduationYearError] = useState<string>("");

  const validateRequiredField = (value: string, fieldName: string): string => {
    return value.trim() === "" ? `${fieldName} is required.` : "";
  };

  const handleClgChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setClgName(event.target.value);
    setClgNameError(validateRequiredField(event.target.value, "College Name"));
  };

  const handleDepartChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDepart(event.target.value);
    setDepartError(validateRequiredField(event.target.value, "Department"));
  };

  const handleEnrollNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnrollNo(event.target.value);
    setEnrollNoError(
      validateRequiredField(event.target.value, "Enrollment Number")
    );
  };

  const handleEnrollYearChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEnrollYear(event.target.value);
    setEnrollYearError(
      validateRequiredField(event.target.value, "Enrollment Year")
    );
  };

  const handleGraduationYearChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setGraduationYear(event.target.value);
    setGraduationYearError(
      validateRequiredField(event.target.value, "Graduation Year")
    );
  };
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
        College Details
      </h1>
      <div style={{ marginBottom: 30 }}>
        <label
          style={{
            textAlign: "left",
            fontSize: 20,
            color: colors.black8,
          }}
        >
          Please provide your college details
        </label>
      </div>

      <SelectInput
        label="College Name"
        value={clgName}
        options={collegeData}
        onChange={handleClgChange}
      />
      {clgNameError && <p className="error">{clgNameError}</p>}

      <CustomInput
        label="Enrollment Number"
        value={enrollNo}
        placeholder="Enter Your Enrollment Number"
        onChange={handleEnrollNoChange}
        style={{ marginTop: -10 }}
      />
      {enrollNoError && <p className="error">{enrollNoError}</p>}

      <SelectInput
        label="Department"
        value={depart}
        options={departmentList}
        onChange={handleDepartChange}
      />
      {departError && <p className="error">{departError}</p>}
      <SelectInput
        label="Enroll Year"
        value={enrollYear}
        options={yearList}
        onChange={handleEnrollYearChange}
      />
      {enrollYearError && <p className="error">{enrollYearError}</p>}

      {/* <SelectInput
        label="Graduation Year"
        value={graduationYear}
        options={yearList}
        onChange={handleGraduationYearChange}
      />
      {graduationYearError && <p className="error">{graduationYearError}</p>} */}
      <SelectInput
        label="Current Semester"
        value={graduationYear}
        options={semester}
        onChange={handleGraduationYearChange}
      />
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
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

export default memo(CollegeForm);

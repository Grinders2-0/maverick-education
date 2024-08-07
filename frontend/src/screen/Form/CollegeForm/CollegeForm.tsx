import React, { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../../../components/CustomInput/CustomInput";
import SelectInput from "../../../components/SelectInput/SelectInput";
import collegeData from "../../../assets/data/collegeData.json";
import departmentList from "../../../assets/data/departmentData.json";
import yearList from "../../../assets/data/yearData.json";
import semester from "../../../assets/data/semester.json";
import "./CollegeForm.css";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { colors } from "../../../util/constant/colors";
import { changeCollegeFormDetail } from "../../../redux/action/form/collegeForm";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../redux/app/store";
import { getSubjectBySem } from "../../../redux/action/subject/subject";

type Props = {
  onNextPress?: () => void;
};

const CollegeForm = ({ onNextPress }: Props) => {
  const dispatch = useAppDispatch();
  const collegeDetail = useAppSelector(
    (state: RootState) => state.form.collegeDetail
  );
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [clgNameError, setClgNameError] = useState<string>("");
  const [departError, setDepartError] = useState<string>("");
  const [enrollNoError, setEnrollNoError] = useState<string>("");
  const [enrollYearError, setEnrollYearError] = useState<string>("");
  const [currentSemesterYearError, setcurrentSemesterYearError] =
    useState<string>("");

  const validateRequiredField = (value: string, fieldName: string): string => {
    return value.trim() === "" ? `${fieldName} is required.` : "";
  };
  const isFirst = useRef<boolean>(true);

  const handleClgChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    dispatch(changeCollegeFormDetail("collegeName", value));
  };

  const handleDepartChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    dispatch(changeCollegeFormDetail("department", value));
  };

  const handleEnrollNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(changeCollegeFormDetail("enrollmentNumber", value));
  };

  const handleEnrollYearChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    const gYear = String(Number(value) + 4);
    dispatch(changeCollegeFormDetail("enrollmentYear", value));
    dispatch(changeCollegeFormDetail("expectedGraduationYear", gYear));
  };

  const handleCurrentSemChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    dispatch(changeCollegeFormDetail("semester", value));
  };

  const validateFormOnSubmit = () => {
    const clgNameValidationError = validateRequiredField(
      collegeDetail?.collegeName ?? "",
      "College Name"
    );
    const departValidationError = validateRequiredField(
      collegeDetail?.department ?? "",
      "Department"
    );
    const enrollNoValidationError = validateRequiredField(
      collegeDetail?.enrollmentNumber ?? "",
      "Enrollment Number"
    );
    const enrollYearValidationError = validateRequiredField(
      collegeDetail?.enrollmentYear ?? "",
      "Enrollment Year"
    );
    const currentSemesterValidationError = validateRequiredField(
      collegeDetail?.semester ?? "",
      "Current Semester"
    );

    setClgNameError(clgNameValidationError);
    setDepartError(departValidationError);
    setEnrollNoError(enrollNoValidationError);
    setEnrollYearError(enrollYearValidationError);
    setcurrentSemesterYearError(currentSemesterValidationError);

    return !(
      clgNameValidationError ||
      departValidationError ||
      enrollNoValidationError ||
      enrollYearValidationError ||
      currentSemesterValidationError
    );
  };

  const handleNextPress = () => {
    setIsLoading(true);
    const isFormValid = validateFormOnSubmit();

    if (isFormValid && onNextPress) {
      dispatch(
        getSubjectBySem(collegeDetail?.semester ?? "", (success) => {
          if (success) {
            onNextPress();
          } else {
            alert("Error getting subject detail");
          }
          setIsLoading(false);
        })
      );
    } else {
      setIsLoading(false);
    }
  };

  return (
    <section
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: "60%",
        marginRight: "10%",
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
          style={{ textAlign: "left", fontSize: 20, color: colors.black8 }}
        >
          Please provide your college details
        </label>
      </div>

      <SelectInput
        label="College Name"
        value={collegeDetail?.collegeName ?? ""}
        defaultValue={collegeDetail?.collegeName ?? ""}
        options={collegeData}
        onChange={handleClgChange}
      />
      {clgNameError && (
        <p className="error" style={{ marginTop: -10, marginBottom: 10 }}>
          {clgNameError}
        </p>
      )}

      <CustomInput
        label="Enrollment Number"
        value={collegeDetail?.enrollmentNumber ?? ""}
        defaultValue={collegeDetail?.enrollmentNumber ?? ""}
        placeholder="Enter Your Enrollment Number"
        onChange={handleEnrollNoChange}
        style={{ marginTop: -10 }}
      />
      {enrollNoError && (
        <p className="error" style={{ marginTop: -10, marginBottom: 10 }}>
          {enrollNoError}
        </p>
      )}

      <SelectInput
        label="Department"
        value={collegeDetail?.department ?? ""}
        defaultValue={collegeDetail?.department ?? ""}
        options={departmentList}
        onChange={handleDepartChange}
      />
      {departError && (
        <p className="error" style={{ marginTop: -10, marginBottom: 10 }}>
          {departError}
        </p>
      )}

      <SelectInput
        label="Enroll Year"
        value={collegeDetail?.enrollmentYear ?? ""}
        defaultValue={collegeDetail?.enrollmentYear ?? ""}
        options={yearList}
        onChange={handleEnrollYearChange}
      />
      {enrollYearError && (
        <p
          className="error"
          style={{ height: 20, marginTop: -10, marginBottom: 10 }}
        >
          {enrollYearError}
        </p>
      )}

      <SelectInput
        label="Current Semester"
        value={collegeDetail?.semester ?? ""}
        defaultValue={collegeDetail?.semester ?? ""}
        options={semester}
        onChange={handleCurrentSemChange}
      />
      {currentSemesterYearError && (
        <p className="error" style={{ marginTop: -10, marginBottom: 10 }}>
          {currentSemesterYearError}
        </p>
      )}

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
          disabled={isLoading}
          onClick={handleNextPress}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
};

export default memo(CollegeForm);

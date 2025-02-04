import React, { memo, useState } from "react";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { colors } from "../../../util/constant/colors";
import TextButton from "../../../components/TextButton/TextButton";
import SelectionSubject from "../../../components/Subject/SelectionSubject";
import { useAppDispatch, useAppSelector } from "../../../redux/app/store";
import { modifySelectedSubjectDetail } from "../../../redux/action/subject/subject";
import { ISubjectModel } from "../../../@types/form";
type props = {
  onNextPress?: () => void;
  onBackPrees?: () => void;
};
const SelectSubject = ({ onNextPress, onBackPrees }: props) => {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const subjects = useAppSelector((state) => state.form?.subjectDetail);
  const dispatch = useAppDispatch();
  const handleSelectSubject = (subjectCode: string, item: ISubjectModel) => {
    setSelectedSubjects((prevSelectedSubjects) =>
      prevSelectedSubjects.includes(subjectCode)
        ? prevSelectedSubjects.filter((code) => code !== subjectCode)
        : [...prevSelectedSubjects, subjectCode]
    );
    dispatch(modifySelectedSubjectDetail(item?._id ?? ""));
  };
  const onBoxPress = () => {};
  const onNextButtonPress = () => {
    if (selectedSubjects.length < 1) {
      alert("select subjects of your current semester");
      return;
    }
    onNextPress && onNextPress();
  };
  return (
    <section
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: "60%",
        marginRight: "10%",
        // background: "#00000040",
        flexWrap: "wrap",
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
        Subject Selection
      </h1>
      <div style={{ marginBottom: 30 }}>
        <label
          style={{
            textAlign: "left",
            fontSize: 20,
            color: colors.black8,
          }}
        >
          Please select your subjects according to your university standard
        </label>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "500px", // Adjust height as needed
          overflowY: "auto",
          paddingRight: "10px", // Add padding to avoid overlap with scrollbar
          scrollbarWidth: "thin", // Thin scrollbar for Firefox
          scrollbarColor: "#888 #e0e0e0", // Custom colors for Firefox scrollbar
          marginBottom: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            padding: "10px", // Add padding for inner content
          }}
        >
          {subjects.map((subject) => (
            <SelectionSubject
              key={subject?._id}
              subjectName={subject?.sname ?? ""}
              subjectCode={subject?.scode ?? ""}
              isSelected={selectedSubjects.includes(subject?.scode ?? "")}
              onSelect={() =>
                handleSelectSubject(subject?.scode ?? "", subject)
              }
            />
          ))}
        </div>
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
          onClick={onNextButtonPress}
        />
      </div>
    </section>
  );
};

export default memo(SelectSubject);

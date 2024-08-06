import React, { memo, useCallback, useState } from "react";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { colors } from "../../../util/constant/colors";
import TextButton from "../../../components/TextButton/TextButton";
import { questions, quetionProps } from "../../../assets/data/questions";
import { useAppDispatch } from "../../../redux/app/store";
import { changeSurveyDetail } from "../../../redux/action/form/collegeForm";
type props = {
  onNextPress?: () => void;
  onBackPrees?: () => void;
};
const Servey = ({ onNextPress, onBackPrees }: props) => {
  const [currQuestion, setCurrQuestion] = useState<number>(1);
  const [optionSelection, setOptionSelection] = useState<string>("00000");
  const [currSelection, setCurrSelection] = useState<number>(0);
  const qLength = questions?.length;
  const dispatch = useAppDispatch();

  const onNextQuestionPress = useCallback(() => {
    let char = optionSelection.charAt(currQuestion - 1);
    if (char == "0") {
      alert("Please choose one of the option");
      return;
    }
    if (currQuestion == qLength) {
      onNextPress && onNextPress();
    } else {
      setCurrQuestion(currQuestion + 1);
      setCurrSelection(0);
    }
  }, [currQuestion, currSelection]);

  const onBackQuestionPrees = useCallback(() => {
    if (currQuestion == 1) {
      onBackPrees && onBackPrees();
    } else {
      setCurrQuestion(currQuestion - 1);
    }
  }, [currQuestion]);
  const onOptionPress = (ind: number) => {
    setCurrSelection(ind + 1);
    if (currQuestion == 1) {
      dispatch(changeSurveyDetail("attendace", ind + 1));
    } else if (currQuestion == 2) {
      dispatch(changeSurveyDetail("participation", ind + 1));
    } else if (currQuestion == 3) {
      dispatch(changeSurveyDetail("assignmentCompletion", ind + 1));
    } else if (currQuestion == 4) {
      dispatch(changeSurveyDetail("examMotivation", ind + 1));
    } else if (currQuestion == 5) {
      dispatch(changeSurveyDetail("preferredMaterial", ind + 1));
    }

    // Replace the character in the optionSelection string at currQuestion-1 with the selected option index.
    let updatedSelection =
      optionSelection.substring(0, currQuestion - 1) +
      String(ind + 1) +
      optionSelection.substring(currQuestion);

    setOptionSelection(updatedSelection);
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
        Survey
      </h1>
      <div style={{ marginBottom: 30 }}>
        <label
          style={{
            textAlign: "left",
            fontSize: 20,
            color: colors.black8,
          }}
        >
          Help us know you
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
          flex: 1,
        }}
      >
        {questions.map((item: quetionProps, index: number) => {
          return (
            <div style={{}}>
              {index == currQuestion - 1 && (
                <div style={{ padding: 20, paddingLeft: 0 }}>
                  <div>
                    <h1 style={{ color: colors.accent, fontSize: 28 }}>
                      0{index + 1}
                      <label
                        style={{ fontSize: 14, color: colors.darkSkeleton }}
                      >
                        /0{questions.length}
                      </label>
                    </h1>
                    <div style={{ marginTop: 25, marginBottom: 20 }}>
                      <label
                        style={{
                          fontSize: 20,
                          color: colors.black,
                        }}
                      >
                        {item?.question}
                      </label>
                    </div>
                    {item?.options?.map((item: string, index: number) => {
                      let char = optionSelection.charAt(currQuestion - 1);

                      return (
                        <div
                          onClick={() => onOptionPress(index)}
                          style={{
                            borderWidth: 1,
                            borderColor: colors.skeletonBgColor,
                            borderStyle: "solid",
                            padding: 15,
                            paddingLeft: 20,
                            paddingRight: 20,
                            marginBottom: 10,
                            borderRadius: 10,
                            background:
                              index + 1 == Number(char)
                                ? colors.optionBG
                                : "transparent",
                          }}
                        >
                          {item}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
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
            onClick={onBackQuestionPrees}
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
          text={currQuestion == qLength ? "Submit" : "Next"}
          style={{
            marginTop: 20,
            backgroundColor: colors.accent,
            paddingLeft: 30,
            paddingRight: 30,
          }}
          onClick={onNextQuestionPress}
        />
      </div>
    </section>
  );
};

export default memo(Servey);

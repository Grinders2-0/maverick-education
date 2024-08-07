import React, { memo } from "react";
import ShowSubject from "../../../components/Subject/ShowSubject";
import ShowCourse from "../../../components/Subject/ShowCourse";
import { colors } from "../../../util/constant/colors";
import ProgressChart from "../../../components/Chart/ProgressChart/ProgressChart";
import CustomButton from "../../../components/CustomButton/CustomButton";

const SubjectCourse = () => {
  const onExplorePress = () => {};
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            // borderWidth: 1,
            // borderStyle: "solid",
            borderRadius: 10,
            padding: 30,
            width: "80%",
            paddingTop: 30,
            paddingBottom: 30,
            height: 200,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <label style={{ fontWeight: "bold", fontSize: 30 }}>
              Subject Name:
            </label>
            <label
              style={{
                marginLeft: 5,
                fontSize: 27,
                color: colors.black,
                fontWeight: "bold",
              }}
            >
              Compiler Design
            </label>
          </div>
          <div
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <label style={{ fontSize: 20 }}>Subject Code:</label>
            <label style={{ marginLeft: 5, fontSize: 18, color: colors.black }}>
              3160707
            </label>
          </div>
          <div
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <label style={{ fontSize: 20 }}>Subject Credit:</label>
            <label
              style={{
                marginLeft: 5,
                fontSize: 18,
                // fontWeight: "bold",
                color: colors.black,
              }}
            >
              5
            </label>
          </div>
        </div>
        <div style={{ marginRight: 20 }}>
          <ProgressChart progress={30} color={colors.accent} />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          padding: 20,
          width: "98%",
          borderRadius: 10,
          marginTop: 30,
        }}
      >
        <CustomButton
          text="Theory Of Computation"
          style={{ marginRight: 10, background: colors.accent }}
        />
        <CustomButton
          text="Microprocessor Interfacing"
          style={{ background: colors.accent }}
        />
      </div>
      <div style={{ marginTop: 50, display: "flex" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%",
            overflowY: "auto",
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]?.map(
            (item, index) => {
              return (
                <div key={index} style={{ width: "100%" }}>
                  <ShowCourse
                    sname="D.C. Circuit"
                    style={{ marginRight: 10, marginBottom: 20 }}
                    onClick={() => onExplorePress()}
                  />
                </div>
              );
            }
          )}
        </div>
        {/* <div
        style={{
          display: "flex",
          flex: 1,
          width: "20%",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            height: 150,
            width: 4,
            background: "black",
            borderRadius: 20,
          }}
        />
        <div
          style={{
            borderWidth: 3,
            borderStyle: "solid",
            height: 30,
            width: 30,
            borderRadius: 1000,
          }}
        ></div>
        <div
          style={{
            height: 150,
            width: 4,
            background: "black",
            borderRadius: 20,
          }}
        />
      </div> */}
      </div>
    </div>
  );
};

export default memo(SubjectCourse);

import React, { memo } from "react";
import TimelineChart from "../../../components/Chart/TimeLineChart/TimeLineChart";
import CGPAChart from "../../../components/Chart/CGPAChart/CGPAChart";
import SPIChart from "../../../components/Chart/SPIChart/SPIChart";
import { colors } from "../../../util/constant/colors";
import ExamScheduleChart from "../../../components/Chart/ExamScheduleChart/ExamScheduleChart";
import SimpleAreaChart from "../../../components/Chart/SimpleAreaChart/SimpleAreaChart";
import { useAppSelector } from "../../../redux/app/store";
import ShowCourse from "../../../components/Subject/ShowCourse";
import { mixpanelTrack } from "../../../util/mixpanel";
const data = [
  {
    _id: "66b326e0c2767bc49611e028",
    userId: "66a635905d00a9b4d5f6ef43",
    grades: [
      {
        subjectCode: "3160001",
        grade: "AA",
        _id: "66b326e0c2767bc49611e029",
      },
      {
        subjectCode: "3160003",
        grade: "AA",
        _id: "66b326e0c2767bc49611e02a",
      },
      {
        subjectCode: "3160704",
        grade: "BC",
        _id: "66b326e0c2767bc49611e02b",
      },
      {
        subjectCode: "3160707",
        grade: "AB",
        _id: "66b326e0c2767bc49611e02c",
      },
      {
        subjectCode: "3160712",
        grade: "AB",
        _id: "66b326e0c2767bc49611e02d",
      },
      {
        subjectCode: "3160713",
        grade: "AB",
        _id: "66b326e0c2767bc49611e02e",
      },
      {
        subjectCode: "3160716",
        grade: "AB",
        _id: "66b326e0c2767bc49611e02f",
      },
    ],
    spi: "8.70",
    cgpa: "8.59",
    semester: "5",
    __v: 0,
  },
  {
    _id: "66b3270bc2767bc49611e03b",
    userId: "66a635905d00a9b4d5f6ef43",
    grades: [
      {
        subjectCode: "3160001",
        grade: "AA",
        _id: "66b3270bc2767bc49611e03c",
      },
      {
        subjectCode: "3160003",
        grade: "AA",
        _id: "66b3270bc2767bc49611e03d",
      },
      {
        subjectCode: "3160704",
        grade: "BC",
        _id: "66b3270bc2767bc49611e03e",
      },
      {
        subjectCode: "3160707",
        grade: "AB",
        _id: "66b3270bc2767bc49611e03f",
      },
      {
        subjectCode: "3160712",
        grade: "AB",
        _id: "66b3270bc2767bc49611e040",
      },
      {
        subjectCode: "3160713",
        grade: "AB",
        _id: "66b3270bc2767bc49611e041",
      },
      {
        subjectCode: "3160716",
        grade: "AB",
        _id: "66b3270bc2767bc49611e042",
      },
    ],
    spi: "8.70",
    cgpa: "8.59",
    semester: "6",
    __v: 0,
  },
];
const DashBoard = () => {
  const userInfo = useAppSelector((state) => state.auth?.userInfo);
  const aiData = useAppSelector((state) => state.form?.aiData);
  console.log("userInfo", userInfo);

  const spiData = {
    labels: [
      "sem 1",
      "sem 2",
      "sem 3",
      "sem 4",
      "sem 5",
      "sem 6",
      "sem 7",
      "sem 8",
    ],
    values: [8, 7.5, 9, 8, 6.5, 9.1, 7.9, 8.4],
  };

  const cgpaData = {
    labels: ["sem 5", "sem 6", "sem 7", "sem 8"],
    values: [8.5, 8.7, 8.8, 9.0],
  };
  const onLearnPress = (url: string) => {
    mixpanelTrack("User Learning Course");
    window.open(url, "_blank");
  };
  return (
    <div
      style={{
        background: colors.highlightBackground,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginRight: 20,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            height: 45,
            width: 45,
            borderRadius: 1000,
            marginRight: 10,
            background: colors.accent,

            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <h4 style={{ color: "white" }}>J</h4>
        </div>
        {/* <label>{userInfo?.fName + "" + userInfo?.lName} </label> */}
        <label>Jeneesh S.</label>
      </div>
      <div
        style={{
          flexDirection: "row",
          display: "flex",
        }}
        className=""
      >
        <TimelineChart />
        {/* <ExamScheduleChart /> */}
        <div
          style={{
            marginRight: 20,
            flexDirection: "column",
            display: "flex",
          }}
        >
          {/* <SimpleAreaChart /> */}
          <SPIChart
            data={spiData}
            style={{
              width: "350px",
              marginBottom: 20,
              display: "flex",
              flex: 1,
            }}
          />

          <CGPAChart
            data={cgpaData}
            style={{ width: "350px", display: "flex", flex: 1 }}
          />
        </div>
      </div>
      <div>
        <div style={{ marginTop: 30 }}>
          <h2 style={{ fontSize: 34 }}>Your Personalize Learning</h2>
        </div>
        <div style={{ width: "100%" }}>
          {aiData && aiData?.length > 0 ? (
            aiData?.map((item: any, index: number) => {
              return (
                <ShowCourse
                  sname={item?.name}
                  style={{
                    marginRight: 10,
                    marginBottom: 20,
                  }}
                  isDash
                  onClick={() => onLearnPress(item?.url ?? "")}
                />
              );
            })
          ) : (
            <>
              <ShowCourse
                sname={"Probablistic Reasoning"}
                style={{
                  marginRight: 10,
                  marginBottom: 20,
                }}
                isDash
                // onClick={() => onLearnPress(item?.url ?? "")}
              />
              <ShowCourse
                sname={"Natural Language Processing"}
                style={{
                  marginRight: 10,
                  marginBottom: 20,
                }}
                isDash
                // onClick={() => onLearnPress(item?.url ?? "")}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(DashBoard);

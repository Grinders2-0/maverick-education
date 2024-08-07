import React, { memo } from "react";
import ShowSubject from "../../../components/Subject/ShowSubject";
import ShowCourse from "../../../components/Subject/ShowCourse";

const SubjectCourse = () => {
  const onExplorePress = () => {};
  return (
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
              <div key={index} style={{ width: "80%" }}>
                <ShowCourse
                  sname="D.C. Circuit"
                  style={{ marginRight: 10, marginBottom: 20 }}
                  onClick={() => onExplorePress()}
                />
              </div>
            );
          }
        )}
        <div></div>
      </div>
    </div>
  );
};

export default memo(SubjectCourse);

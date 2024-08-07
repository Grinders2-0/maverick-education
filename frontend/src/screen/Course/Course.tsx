import React, { memo, useEffect, useState } from "react";
import SearchBar from "../../components/SerachBaar/SearchBar";
import ShowSubject from "../../components/Subject/ShowSubject";
import { colors } from "../../util/constant/colors";
import ShowCourse from "../../components/Subject/ShowCourse";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import { setCourseDetail } from "../../redux/reducer/formSlice";
import {
  getAllCourseDetail,
  getSearchCourseDetail,
} from "../../redux/action/form/collegeForm";

const Course = () => {
  const courseDetail = useAppSelector((state) => state.form?.courseDetail);
  const [searchText, setSearchText] = useState<string>("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCourseDetail((success) => {}));
  }, []);
  const onSearchPress = (text: string) => {
    if (text?.length == 0) {
      dispatch(getAllCourseDetail((success) => {}));
    } else {
      dispatch(getSearchCourseDetail(text, (success) => {}));
    }
  };
  const onLearnPress = (link: string) => {
    if (link?.length == 0) {
      alert("data not comming");
      return;
    }
    window.open(link, "_blank");
  };
  return (
    <div style={{ padding: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <SearchBar
          value={searchText}
          setValue={setSearchText}
          onSearch={onSearchPress}
          style={{
            width: "50%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        />
      </div>
      <div style={{ marginTop: 50, display: "flex", width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%",
            height: "100%",
          }}
        >
          {courseDetail?.map((item, index) => {
            return (
              <div key={index} style={{ width: "100%" }}>
                <ShowCourse
                  sname={item?.name}
                  style={{ marginRight: 10, marginBottom: 20 }}
                  onClick={() => onLearnPress(item?.url ?? "")}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(Course);

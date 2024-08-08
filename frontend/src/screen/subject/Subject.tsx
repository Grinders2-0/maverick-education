import React, { memo, useEffect, useState } from "react";
import SearchBar from "../../components/SerachBaar/SearchBar";
import ShowSubject from "../../components/Subject/ShowSubject";
import { colors } from "../../util/constant/colors";
import SubjectCourse from "../home/SubjectCourse/SubjectCourse";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import {
  getSearchCourseDetail,
  getSubjectBySemester,
} from "../../redux/action/form/collegeForm";
import { getSubjectBySem } from "../../redux/action/subject/subject";
import { ISubjectModel } from "../../@types/form";
import { setSingleSubjectDetail } from "../../redux/reducer/formSlice";
import { mixpanelTrack } from "../../util/mixpanel";

const Subject = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [selectedSub, setSelectedSub] = useState<boolean>(false);
  const subjectData = useAppSelector((state) => state.form?.fullSubjectDetails);
  const subject = useAppSelector((state) => state.form?.subjectDetail);
  console.log("subjectData", subjectData);
  useEffect(() => {
    dispatch(getSubjectBySem("7", (success) => {}));
  }, []);
  const dispatch = useAppDispatch();
  const onSearchPress = () => {};
  const onExplorePress = (code: string, item: ISubjectModel) => {
    mixpanelTrack("user Press subject button");
    dispatch(setSingleSubjectDetail(item));
    dispatch(
      getSearchCourseDetail(code, (success) => {
        if (success) {
          setSelectedSub(!selectedSub);
        } else {
          // setSelectedSub(!selectedSub);
        }
      })
    );
  };
  return (
    <div style={{ padding: 20 }}>
      {selectedSub ? (
        <div>
          <SubjectCourse />
        </div>
      ) : (
        <div style={{}}>
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
              {subject?.map((item, index) => {
                return (
                  <div key={index} style={{}}>
                    <ShowSubject
                      scode={item.scode}
                      sname={item?.sname}
                      style={{ marginRight: 10, marginBottom: 20 }}
                      onClick={() => onExplorePress(item?.scode ?? "", item)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(Subject);

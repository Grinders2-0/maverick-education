import { ICollegeInfo, IServay } from "../../../@types/form";
import { SubjectService } from "../../../service/api/service";
import { AppDispatch, RootState } from "../../app/store";
import {
  setCollegeDetail,
  setImageArray,
  setSurveyDetail,
} from "../../reducer/formSlice";

export const changeCollegeFormDetail =
  <K extends keyof ICollegeInfo>(key: K, data: ICollegeInfo[K]) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const collegeDetail = { ...state.form?.collegeDetail };
    const updateData = { ...collegeDetail, [key]: data };
    dispatch(setCollegeDetail(updateData));
  };
export const changeSurveyDetail =
  <K extends keyof IServay>(key: K, data: IServay[K]) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const serveyDetail = { ...state.form?.collegeDetail };
    const updateData = { ...serveyDetail, [key]: data };
    dispatch(setSurveyDetail(updateData));
  };

export const addImageDetail =
  (newFile: File) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const images = state.form?.imageArray || [];

    // Check if a file with the same name already exists
    const index = images.findIndex((file: File) => file.name === newFile.name);

    let updatedImages;
    if (index > -1) {
      // Replace the existing file
      updatedImages = [
        ...images.slice(0, index),
        newFile,
        ...images.slice(index + 1),
      ];
    } else {
      // Add the new file
      updatedImages = [...images, newFile];
    }

    // Dispatch the updated images array
    dispatch(setImageArray(updatedImages));
  };
export const formSubmit =
  (onSuccess: (success: boolean) => void) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const form = state.form;

    try {
      const collegeInfo = form?.collegeDetail;
      const selectedSubject = form?.selectedSubjects;
      const resultArray = form?.imageArray;
      const surveyDetail = form?.surveyDetail;

      const college = await SubjectService.collegeInfo(collegeInfo);
      const subject = await SubjectService.studentSubject(selectedSubject);
      const result = await SubjectService.uploadResult(resultArray);
      const survey = await SubjectService.addSurvey(surveyDetail);
      if (!college || !subject) {
        onSuccess(false);
        alert("failed");
        return;
      }

      onSuccess(true);
    } catch (e: any) {
      alert("faled");
      onSuccess(false);
    }
  };

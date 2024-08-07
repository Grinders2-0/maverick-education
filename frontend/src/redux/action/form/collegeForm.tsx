import { ICollegeInfo, IServay } from "../../../@types/form";
import { SubjectService } from "../../../service/api/service";
import { mixpanelTrack } from "../../../util/mixpanel";
import { AppDispatch, RootState } from "../../app/store";
import {
  setCollegeDetail,
  setCourseDetail,
  setImageArray,
  setResultDetails,
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
  (newFiles: File[]) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const existingImages = state.form?.imageArray || [];

    // Combine existing images with new files, removing duplicates by file name
    const fileMap = new Map<string, File>();

    // Add existing images to the map
    existingImages.forEach((file) => {
      fileMap.set(file.name, file);
    });

    // Add new files to the map (will overwrite existing files with the same name)
    newFiles.forEach((file) => {
      fileMap.set(file.name, file);
    });

    // Convert the map back to an array
    const updatedImages = Array.from(fileMap.values());

    // Dispatch the updated images array
    dispatch(setImageArray(updatedImages));
  };
export const formSubmit =
  (onSuccess: (success: boolean) => void) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    mixpanelTrack("Form Submit Press");

    const state = getState();
    const form = state.form;

    try {
      const collegeInfo = form?.collegeDetail;
      const selectedSubject = form?.selectedSubjects;
      const resultArray = form?.imageArray;
      const surveyDetail = form?.surveyDetail;
      const prepareFormData = (files: File[]) => {
        const formData = new FormData();
        files.forEach((file) => {
          formData.append("images", file); // Use the fixed key 'images'
        });
        return formData;
      };
      const data = prepareFormData(resultArray);
      const college = await SubjectService.collegeInfo(collegeInfo);
      const subject = await SubjectService.studentSubject(selectedSubject);

      const result = await SubjectService.uploadResult(data);
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
export const isFormSubmit =
  (onSuccess: (success: boolean) => void) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const form = state.form;

    try {
      const college = await SubjectService.formExist();
      if (!college) {
        onSuccess(false);
        alert("failed");
        return;
      }
      const isExist = college?.exists;
      if (isExist) {
        onSuccess(true);
      } else {
        onSuccess(true);
      }
    } catch (e: any) {
      alert("faled");
      onSuccess(false);
    }
  };
export const getAllResultData =
  (onSuccess: (success: boolean) => void) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const form = state.form;

    try {
      const result = await SubjectService.getStudentResult();
      if (!result) {
        onSuccess(false);
        alert("failed 12");
        return;
      }
      dispatch(setResultDetails(result));
    } catch (e: any) {
      alert("faled");
      onSuccess(false);
    }
  };

export const getAllCourseDetail =
  (onSuccess: (success: boolean) => void) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const form = state.form;

    try {
      const college = await SubjectService.getAllCourse();
      if (!college) {
        onSuccess(false);
        alert("failed");
        return;
      }
      dispatch(setCourseDetail(college?.courses));
      onSuccess(true);
    } catch (e: any) {
      alert("faled");
      onSuccess(false);
    }
  };
export const getSearchCourseDetail =
  (text: string, onSuccess: (success: boolean) => void) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const form = state.form;

    try {
      const college = await SubjectService.searchCourse(text);
      if (!college) {
        onSuccess(false);
        alert("failed");
        return;
      }
      dispatch(setCourseDetail(college?.data));
      onSuccess(true);
    } catch (e: any) {
      alert("faled");
      onSuccess(false);
    }
  };
export const getSubjectBySemester =
  (onSuccess: (success: boolean) => void) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const form = state.form;

    try {
      const college = await SubjectService.getSubjectOfSem();
      if (!college) {
        onSuccess(false);
        alert("failed");
        return;
      }
      const data = college?.userSubject?.selectedSubjects;
      dispatch(setCourseDetail(college?.data));
      onSuccess(true);
    } catch (e: any) {
      alert("faled");
      onSuccess(false);
    }
  };

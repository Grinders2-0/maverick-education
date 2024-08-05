import { ISubjectModel } from "../../../@types/form";
import { SubjectService } from "../../../service/api/service";
import { AppDispatch, RootState } from "../../app/store";
import {
  setCollegeDetail,
  setSelectedSubjectDetail,
  setSubjectDetail,
} from "../../reducer/formSlice";

export const getSubjectBySem =
  (sem: string, onSuccess: (success: boolean) => void) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const subject = await SubjectService.getSubject(sem);
      if (subject) {
        dispatch(setSubjectDetail(subject?.subjects));
        onSuccess(true);
      } else {
        onSuccess(false);
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
      onSuccess(false);
    }
  };
export const modifySelectedSubjectDetail =
  (scode: string, item: ISubjectModel) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const subjectDetails = state.form?.selectedSubjects || [];

    // Find the index of the subject
    const index = subjectDetails.findIndex(
      (subject) => subject?.scode === scode
    );

    // Create a new array based on the current state
    let newSubjectDetails;
    if (index > -1) {
      // If the subject code exists, remove it
      newSubjectDetails = [
        ...subjectDetails.slice(0, index),
        ...subjectDetails.slice(index + 1),
      ];
    } else {
      // If the subject code doesn't exist, add the new subject
      newSubjectDetails = [...subjectDetails, item];
    }

    // Dispatch the updated list of selected subjects
    dispatch(setSelectedSubjectDetail(newSubjectDetails));
  };

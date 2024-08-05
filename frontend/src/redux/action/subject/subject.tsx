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

    // Check if the subject code already exists in the array
    const index = subjectDetails.findIndex(
      (subject) => subject.scode === scode
    );

    // If subject code exists, remove it
    if (index > -1) {
      subjectDetails.splice(index, 1);
    } else {
      // If subject code does not exist, add the new subject
      subjectDetails.push(item);
    }

    // Dispatch the updated list of selected subjects
    dispatch(setSelectedSubjectDetail(subjectDetails));
  };

import { SubjectService } from "../../../service/api/service";
import { AppDispatch, RootState } from "../../app/store";
import { setCollegeDetail, setSubjectDetail } from "../../reducer/formSlice";

export const getSubjectBySem =
  (sem: string, onSuccess: (success: boolean) => void) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const subject = await SubjectService.getSubject(sem);
      console.log("Subject:", subject);

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

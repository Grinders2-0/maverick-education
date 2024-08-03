import { ICollegeInfo } from "../../../@types/form";
import { AppDispatch, RootState } from "../../app/store";
import { setCollegeDetail } from "../../reducer/formSlice";

export const changeCollegeFormDetail =
  <K extends keyof ICollegeInfo>(key: K, data: ICollegeInfo[K]) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const collegeDetail = { ...state.form?.collegeDetail };
    const updateData = { ...collegeDetail, [key]: data };
    dispatch(setCollegeDetail(updateData));
  };

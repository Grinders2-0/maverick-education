import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../app/store";
import { IAuthSlice, IUser } from "../../@types/auth";
import { ICollegeInfo, IFromSlice, ISubjectModel } from "../../@types/form";

const initialState: IFromSlice = {
  collegeDetail: {},
  subjectDetail: [{}],
  selectedSubjects: [{}],
};

export const formSlice = createSlice({
  name: "form,",
  initialState,
  reducers: {
    setCollegeDetail: (state, action: PayloadAction<ICollegeInfo>) => {
      state.collegeDetail = action.payload;
    },
    setSubjectDetail: (state, action: PayloadAction<ISubjectModel[]>) => {
      state.subjectDetail = action.payload;
    },
    setSelectedSubjectDetail: (
      state,
      action: PayloadAction<ISubjectModel[]>
    ) => {
      state.selectedSubjects = action.payload;
    },
  },
});

export const { setCollegeDetail, setSubjectDetail, setSelectedSubjectDetail } =
  formSlice.actions;

export default formSlice.reducer;

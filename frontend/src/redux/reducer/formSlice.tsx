import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../app/store";
import { IAuthSlice, IUser } from "../../@types/auth";
import {
  ICollegeInfo,
  IFromSlice,
  IServay,
  ISubjectModel,
} from "../../@types/form";

const initialState: IFromSlice = {
  collegeDetail: {},
  subjectDetail: [],
  selectedSubjects: [],
  surveyDetail: {},
  imageArray: [],
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
    setSelectedSubjectDetail: (state, action: PayloadAction<string[]>) => {
      state.selectedSubjects = action.payload;
    },
    setSurveyDetail: (state, action: PayloadAction<IServay>) => {
      state.surveyDetail = action.payload;
    },
    setImageArray: (state, action: PayloadAction<File[]>) => {
      state.imageArray = action.payload;
    },
  },
});

export const {
  setCollegeDetail,
  setSubjectDetail,
  setSelectedSubjectDetail,
  setSurveyDetail,
  setImageArray,
} = formSlice.actions;

export default formSlice.reducer;

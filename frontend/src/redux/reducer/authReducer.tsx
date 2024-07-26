import AsyncStorage from "@react-native-async-storage/async-storage";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export interface IAuthSlice {
  fontSizeMultiplier: number;
  isDataLoaded: boolean;
}
const initialState: IAuthSlice = {
  fontSizeMultiplier: 1,
  isDataLoaded: false,
};

export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setFontMultiplierValue: (state, action: PayloadAction<number>) => {
      state.fontSizeMultiplier = action.payload;
    },
    setIsDataLoaded: (state, action: PayloadAction<boolean>) => {
      state.isDataLoaded = action.payload;
    },
  },
});

export const { setFontMultiplierValue, setIsDataLoaded } = authReducer.actions;

export default authReducer.reducer;

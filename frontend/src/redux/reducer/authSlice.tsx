import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAuthSlice, IUser } from "../../@types/auth";

const initialState: IAuthSlice = {
  userToken: null,
  isLoggedIn: null,
  userInfo: {
    isLogin: false,
    loginType: "",
    email: "",
    socialToken: "",
    fName: "",
    lName: "",
    profileImage: "",
    userID: "",
  },
  otp_token: "",
  studentType: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserToken: (state, action: PayloadAction<string | null>) => {
      localStorage.setItem("user_token", JSON.stringify(action.payload));
      state.userToken = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<IUser>) => {
      localStorage.setItem(
        "set_user_auth_data",
        JSON.stringify(action.payload)
      );
      state.userInfo = action.payload;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean | null>) => {
      localStorage.setItem("is_logged", JSON.stringify(action.payload));
      state.isLoggedIn = action.payload;
    },
    setOTPToken: (state, action: PayloadAction<string>) => {
      state.otp_token = action.payload;
    },
    setStudentType: (state, action: PayloadAction<string>) => {
      state.studentType = action.payload;
    },
  },
});

export const {
  setUserToken,
  setUserInfo,
  setIsLoggedIn,
  setOTPToken,
  setStudentType,
} = authSlice.actions;

export default authSlice.reducer;

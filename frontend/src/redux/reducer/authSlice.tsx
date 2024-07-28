import AsyncStorage from "@react-native-async-storage/async-storage";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../app/store";
import { IAuthSlice, IUser } from "../../@types/auth";
import EncryptedStorage from "react-native-encrypted-storage";

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
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserToken: (state, action: PayloadAction<string | null>) => {
      EncryptedStorage.setItem("user_token", JSON.stringify(action.payload));
      state.userToken = action.payload;
    },
    // setFcmToken: (state, action: PayloadAction<string | null>) => {
    //   if (state?.userToken) {
    //     state.userInfo.fcmToken = action.payload;
    //   }
    // },
    setUserInfo: (state, action: PayloadAction<IUser>) => {
      AsyncStorage.setItem(
        "set_user_auth_data",
        JSON.stringify(action.payload)
      );
      state.userInfo = action.payload;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean | null>) => {
      AsyncStorage.setItem("is_logged", JSON.stringify(action.payload));
      state.isLoggedIn = action.payload;
    },
    setOTPToken: (state, action: PayloadAction<string>) => {
      state.otp_token = action.payload;
    },
  },
});

export const { setUserToken, setUserInfo, setIsLoggedIn, setOTPToken } =
  authSlice.actions;

export default authSlice.reducer;

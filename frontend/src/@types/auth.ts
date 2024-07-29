export interface IAuthSlice {
  userToken: string | null;
  isLoggedIn: boolean | null;
  userInfo: IUser;
  otp_token: string;
}
export interface IUser {
  isLogin?: boolean;
  loginType: string;
  email: string | null;
  socialToken?: string | null;
  fName?: string | null | undefined;
  lName?: string | null | undefined;
  profileImage?: string | null;
  password?: string | null | undefined;
  userID?: string | null | undefined;
}

export type loginApiProps = {
  userToken?: string | null | undefined;
  loginType: string | undefined;
  email: string | null | undefined;
  password?: string | undefined;
  socialToken?: string | null | undefined;
  fName?: string | null | undefined;
  lName?: string | null | undefined;
  profileImage?: string | null | undefined;
  isLogin?: boolean | undefined;
};

export type ChangePasswordProps = {
  email: string;
  oldPassword: string;
  newPassword: string;
};

export type VerifyOTPProps = {
  email: string;
  otp: string;
  otp_token: string;
};
export type ResetPasswordProps = {
  email: string;
  password: string;
};

export type profileProps = {
  email: string;
  lName: string;
  fName?: string;
};

import AsyncStorage from "@react-native-async-storage/async-storage";
import EncryptedStorage from "react-native-encrypted-storage";
import {
  ResetPasswordProps,
  VerifyOTPProps,
  IUser,
  profileProps,
} from "../../@types/auth";
import { AuthService } from "../../service/api/service";
import { AppDispatch, RootState } from "../app/store";
import {
  setUserToken,
  setIsLoggedIn,
  setUserInfo,
  setOTPToken,
} from "../reducer/authSlice";

export const getUserTokenFromState = () => async (dispatch: AppDispatch) => {
  const user_token = await EncryptedStorage.getItem("user_token");
  console.log("this is token ", user_token ? JSON.parse(user_token) : null);

  dispatch(setUserToken(user_token ? JSON.parse(user_token) : null));
};

export const getIsLoggedIn = () => async (dispatch: AppDispatch) => {
  const is_loged = await AsyncStorage.getItem("is_logged");
  dispatch(setIsLoggedIn(is_loged ? JSON.parse(is_loged) : null));
};
export const getUserData = () => async (dispatch: AppDispatch) => {
  const user_auth_data = await AsyncStorage.getItem("set_user_auth_data");
  dispatch(setUserInfo(user_auth_data ? JSON.parse(user_auth_data) : null));
};

export const signIn =
  (email: string, password: string, onSuccess: (success: boolean) => void) =>
  async (disptach: AppDispatch, getState: () => RootState) => {
    const cleanedEmail = email.replace(/\s/g, "");
    const cleanPassword = password.replace(/\s/g, "");
    console.log("clearn", cleanedEmail, cleanPassword);

    const stateData = getState();
    const userDAta = stateData.auth?.userInfo;

    if (cleanedEmail === "" || cleanPassword === "") {
      onSuccess(false);
    } else {
      try {
        const data = {
          loginType: "email",
          email: cleanedEmail,
          password: cleanPassword,
          isLogin: true,
        };
        const loginData = await AuthService.login(data);
        if (loginData) {
          const mainData = {
            ...data,
            fName: loginData?.user?.fName ?? "",
            lName: loginData?.user?.lName ?? "",
            userID: loginData?.user?._id ?? "",
          };

          disptach(setIsLoggedIn(true));
          disptach(setUserToken(loginData?.token));
          disptach(setUserInfo(mainData));

          //   navigation.navigate('BottomTab' as never);

          // console.log(loginData);
          onSuccess(true);
        } else {
          //   showMessage({
          //     message: 'SignUp Failed',
          //     description: 'please sign up first in order to login',

          //     type: 'warning',
          //   });
          onSuccess(false);
        }
      } catch (error: any) {
        onSuccess(false);
        // showMessage({
        //   message: 'Sign-in Error',
        //   description: 'Please check your credentials and try again',
        //   type: 'danger',
        // });
      }
    }
  };
export const isEmailValid = (email: string) => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};
export const signUp =
  (
    email: string,
    password: string,
    confirmPassword: string,
    firstName: string,
    lastName: string,
    onSuccess: (success: boolean) => void
  ) =>
  async (disptach: AppDispatch, getState: () => RootState) => {
    const cleanedEmail = email.replace(/\s/g, "");
    const cleanPassword = password.replace(/\s/g, "");
    const cleanConfirmPassword = confirmPassword.replace(/\s/g, "");

    const stateData = getState();
    if (!isEmailValid(email)) {
      //   showMessage({
      //     message: 'Invalid Email',
      //     description: 'Please enter a valid email address.',
      //     type: 'warning',
      //   });
      onSuccess(false);
    } else if (cleanPassword.length < 6) {
      //   showMessage({
      //     message: 'Password Too Short',
      //     description: 'Password should be at least 6 characters long.',
      //     type: 'warning',
      //   });
      onSuccess(false);
    } else if (cleanPassword !== cleanConfirmPassword) {
      //   showMessage({
      //     message: 'Password Mismatch',
      //     description: 'The password and confirm password do not match.',
      //     type: 'warning',
      //   });
      onSuccess(false);
    } else {
      try {
        const data = {
          loginType: "email",
          email: cleanedEmail.toLowerCase(),
          fName: firstName,
          lName: lastName,
          isLogin: false,
          password: cleanPassword,
        };
        const loginData = await AuthService.login(data);
        console.log("Logindata", loginData);

        if (loginData) {
          const mainData = {
            ...data,
            userID: loginData?.user?._id ?? "",
          };
          disptach(setUserInfo(mainData));
          disptach(setIsLoggedIn(true));

          // console.log('LoginData:' + loginData?.token);
          disptach(setUserToken(loginData?.token));
          //   showMessage({
          //     message: 'Sign Up Successfully',
          //     type: 'success',
          //   });

          //   navigation.navigate('BottomTab' as never);
          onSuccess(true);
        } else {
          //   showMessage({
          //     message: 'Login Failed',
          //     description: 'email already in use. Kindly choose another email',
          //     type: 'warning',
          //   });
          onSuccess(false);
        }
      } catch (error: any) {
        console.log("error", error);

        onSuccess(false);
        // showMessage({
        //   message: 'Account Creation Error',
        //   description: 'Please check your credentials and try again',
        //   type: 'danger',
        // });
      }
    }
  };

// GoogleSignin.configure({
//   webClientId:
//     '558142856777-f93jneqj4blhn6ahc39bge1i67qdmd0t.apps.googleusercontent.com',
// });

export const signUpWithGoogle =
  (onSuccess: (success: boolean) => void) =>
  async (disptach: AppDispatch, getState: () => RootState) => {
    const stateData = getState();
    try {
      //   await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      //   const userData = await GoogleSignin.signIn();
      // console.log('data', JSON.stringify(userData, null, 2));

      //   const data = {
      //     loginType: 'google',
      //     email: userData?.user?.email,
      //     socialToken: userData?.user?.id,
      //     fName: userData?.user?.givenName,
      //     lName: userData?.user?.familyName,
      //     profileImage: userData?.user?.photo,
      //   };

      //   const loginData = await AuthService.login();

      //   if (loginData) {
      //     const mainData = {
      //       ...data,
      //       userID: loginData?.user?._id ?? '',
      //     };

      // disptach(setUserInfo(mainData));

      // disptach(setIsLoggedIn(true));

      // console.log('dfasdfadsfadsf', loginData?.token);
      // disptach(setUserToken(loginData?.token));
      // disptach(setIsLoggedIn(true));
      // showMessage({
      //   message: 'Google SignIn Successfully',
      //   type: 'success',
      // });

      onSuccess(true);
      //   } else {
      // showMessage({
      //   message: 'Google SingUp Failed',
      //   description: 'An error occurred while Google SignUp',
      //   type: 'warning',
      // });
      onSuccess(false);
      //   }
    } catch (error: any) {
      onSuccess(false);

      //   showMessage({
      //     message: 'Google Sign Up Error',
      //     description: 'Please check your credentials and try again',
      //     type: 'danger',
      //   });
    }
  };

// export const signUpWithApple =
//   (
//     navigation: NavigationProp<MainStackParamList>,
//     onSuccess: (success: boolean) => void,
//   ) =>
//   async (disptach: AppDispatch, getState: () => RootState) => {
//     const stateData = getState();
//     try {
//       const appleAuthRequestResponse = await appleAuth.performRequest({
//         requestedOperation: appleAuth.Operation.LOGIN,
//         requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
//       });

//       const {identityToken, email, fullName} = appleAuthRequestResponse;
//       const token = await messaging().getToken();

//       const data = {
//         fcmToken: token ? token : '',
//         loginType: 'apple',
//         email: email,
//         socialToken: identityToken,
//         fName: fullName?.givenName,
//         lName: fullName?.familyName,
//       };

//       const loginData = await AuthService.login(data);
//       if (loginData) {
//         disptach(setIsLoggedIn(true));
//         disptach(setUserInfo(data));
//         disptach(setUserToken(loginData?.token));

//         showMessage({
//           message: 'Apple SignIn Successfully',
//           type: 'success',
//         });
//         navigation.navigate('BottomTab' as never);

//         // console.log('dfasdfadsfadsf', loginData);
//         onSuccess(true);
//         // navigation.reset({
//         //   index: 0,
//         //   routes: [{name: 'BottomTab'}],
//         // });
//       } else {
//         showMessage({
//           message: 'Apple SingUp Failed',
//           description: 'An error occurred while Apple SignUp',
//           type: 'warning',
//         });
//         onSuccess(false);
//       }
//     } catch (error: any) {
//       showMessage({
//         message: 'Apple Sign Up Error',
//         description: 'Please check your credentials and try again',
//         type: 'danger',
//       });
//       Sentry.captureMessage('Error in Apple Sign Up ', error);
//       console.error(error);
//     }
//   };

export const singOUt =
  (userToken: string | null, onSuccess: (success: boolean) => void) =>
  async (disptach: AppDispatch, getState: () => RootState) => {
    try {
      const signout = await AuthService.signOut();
      //   await GoogleSignin.signOut();
      disptach(setIsLoggedIn(false));
      //   showMessage({
      //     message: 'Sign Out Successfully',
      //     type: 'success',
      //   });
      disptach(setUserToken(null));

      onSuccess(true);
      // console.log('Signout', signout);
      console.log("Sign-out successful");
    } catch (error: any) {
      onSuccess(false);
      //   showMessage({
      //     message: 'Sign-Out Error',
      //     description: 'Please check your credentials and try again',
      //     type: 'danger',
      //   });
    }
  };

export const changePAssword =
  (
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
    onSuccess: (success: boolean) => void
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const userState = getState();

    const userData = userState.auth?.userInfo;

    const data: any = {
      email: userData.email,
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    const resetPassword = await AuthService.changePassword(data);
    console.log("Reset pasw", resetPassword);
    if (resetPassword) {
      // showMessage({
      //   message: resetPassword?.message,
      //   type: "success",
      // });

      onSuccess(true);
    } else {
      // showMessage({
      //   message: "Password Change Failed",
      //   description: "An error occurred while changing the password",
      //   type: "warning",
      // });
      onSuccess(false);
    }
  };

export const deleteACCOUNT =
  (onSuccess: (success: boolean) => void) =>
  async (disptach: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const userDetail = state.auth.userInfo;

    if (userDetail && userDetail.email) {
      const deleteUser = await AuthService.deleteAccount(userDetail.email);
      const data = {
        isLogin: false,
        fcmToken: "",
        loginType: "",
        email: "",
        socialToken: "",
        fName: "",
        lName: "",
        profileImage: "",
      };
      console.log("delete user", deleteUser);
      if (deleteUser) {
        disptach(setIsLoggedIn(false));
        disptach(setUserInfo(data));
        disptach(setUserToken(null));
        // await GoogleSignin.signOut();

        // navigation.navigate("BottomTab" as never);
        onSuccess(true);
      } else {
        onSuccess(false);
        // showMessage({
        //   message: "Delete Account Failed",
        //   description: "An error occurred while deleting the account",
        //   type: "warning",
        // });
      }
    } else {
      //   showMessage({
      //     message: "You do not have account",
      //     type: "info",
      //   });
      onSuccess(false);
    }
  };

export const resetPassword =
  (email: string, password: string, onSuccess: (success: boolean) => void) =>
  async (disptach: AppDispatch, getState: () => RootState) => {
    const cleanPassword = password.replace(/\s/g, "");

    try {
      const data: ResetPasswordProps = {
        email: email,
        password: cleanPassword,
      };
      const resetpassword = await AuthService.resetPassword(data);
      if (resetpassword && resetpassword.data) {
        // showMessage({
        //   message: resetpassword.message,
        //   type: "success",
        // });
        onSuccess(true);
      } else {
        onSuccess(false);
        // showMessage({
        //   message: "There is a issue in changing password! try again",
        //   type: "warning",
        // });
      }
    } catch (error: any) {
      //   showMessage({
      //     message: "Password Reset Error",
      //     description: error.message,
      //     type: "danger",
      //   });
      onSuccess(false);
    }
  };

// export const sendMAIL =
//   (email: string, onSuccess: (success: boolean) => void) =>
//   async (disptach: AppDispatch, getState: () => RootState) => {
//     const cleanEmail = email.replace(/\s/g, "");

//     if (!isEmailValid(email)) {
//       showMessage({
//         message: "Invalid Email",
//         description: "Please enter a valid email address.",
//         type: "warning",
//       });
//       onSuccess(false);
//     } else {
//       // api call
//       const mail = await AuthService.sendMail(cleanEmail);
//       if (mail) {
//         showMessage({
//           message: "Mail send Successfully ",
//           type: "success",
//         });
//         disptach(setOTPToken(mail.token_otp));
//         onSuccess(true);
//       } else {
//         Sentry.captureMessage("Error in sending mail  ");

//         showMessage({
//           message: "User do not exists with this email",
//           type: "warning",
//         });
//         onSuccess(false);
//       }
//     }
//   };

// export const verificationOTP =
//   (email: string, otp: string, onSuccess: (success: boolean) => void) =>
//   async (disptach: AppDispatch, getState: () => RootState) => {
//     const state = getState();
//     if (otp.length < 6) {
//       showMessage({
//         message: "Invalid OTP",
//         description: "Please Enter Valid OTP.",
//         type: "warning",
//       });
//       onSuccess(false);
//     } else {
//       // api call
//       const data: VerifyOTPProps = {
//         email: email,
//         otp: otp,
//         otp_token: state.auth.otp_token,
//       };
//       const verification = await AuthService.verifyOtp(data);
//       if (verification) {
//         if (verification.isValid) {
//           showMessage({
//             message: "Otp Verified successfully",
//             type: "success",
//           });
//           onSuccess(true);
//         } else {
//           showMessage({
//             message: "Invalid OTP",
//             type: "warning",
//           });
//           onSuccess(false);
//         }
//       } else {
//         onSuccess(false);

//         showMessage({
//           message: "Oops! Something went wrong while trying to send the Otp",
//           type: "warning",
//         });
//       }
//     }
//   };
export const userAUTHORIZED =
  (onSuccess: (success: boolean) => void) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const user_token = await EncryptedStorage.getItem("user_token");
    const token = user_token ? JSON.parse(user_token) : null;
    const is_loged = await AsyncStorage.getItem("is_logged");
    const validateUser = is_loged ? JSON.parse(is_loged) : null;
    if (validateUser) {
      const verification = await AuthService.userAuthorize(token ?? "");
      console.log("Verify", verification);

      if (!verification) {
        const data: IUser = {
          isLogin: false,
          loginType: "",
          email: "",
          socialToken: "",
          fName: "",
          lName: "",
          profileImage: "",
        };

        dispatch(setIsLoggedIn(false));
        dispatch(setUserToken(""));
        dispatch(setUserInfo(data));
        onSuccess(false);
      }
    } else {
      onSuccess(false);
    }
  };

export const updatePROFILE =
  (fName: string, lName: string, onSuccess: (success: boolean) => void) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const userData = state.auth?.userInfo;
    console.log("called");

    if (!userData?.email && userData?.email?.length === 0) {
      onSuccess(false);
    } else {
      if (userData?.email) {
        const body: profileProps = {
          email: userData.email,
          fName: fName,
          lName: lName,
        };
        const updateProfile = await AuthService.updateProfile(body);
        console.log("profile", updateProfile);

        if (updateProfile) {
          const updatedUserData = {
            ...userData,
            fName: updateProfile.fName,
            lName: updateProfile.lName,
          };

          dispatch(setUserInfo(updatedUserData));
          onSuccess(true);
        } else {
          onSuccess(false);
        }
      }
      onSuccess(false);
    }
  };

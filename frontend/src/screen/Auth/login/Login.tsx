import React, { useState } from "react";
import CustomInput from "../../../components/CustomInput/CustomInput";
import { colors } from "../../../util/constant/colors";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { images } from "../../../util/constant/images";
import "./Login.css";
import { validatePassword } from "../../../service/validators/passwordValidator";
import { isValidEmail } from "../../../service/validators/emailValidator";
import {
  auth,
  googleProvider,
  signInWithPopup,
  signOut,
} from "../../../firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { useAppDispatch } from "../../../redux/app/store";
import { signIn, signUpWithGoogle } from "../../../redux/action/auth/auth";
import { isFormSubmit } from "../../../redux/action/form/collegeForm";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);
  const [isGLoading, setIsGLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailValidationError = isValidEmail(email);
    const passwordValidationError = validatePassword(password);

    if (emailValidationError || passwordValidationError) {
      setEmailError(emailValidationError);
      setPasswordError(passwordValidationError);
      return;
    }

    dispatch(
      signIn(email, password, (success) => {
        if (success) {
          dispatch(
            isFormSubmit((success) => {
              if (success) {
                navigate("/dashboard");
              } else {
                navigate("/form");
              }
            })
          );
        }
      })
    );
    setEmailError("");
    setPasswordError("");
  };

  const handleForgotPasswordClick = () => {};
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      dispatch(
        signUpWithGoogle((success) => {
          if (success) {
            dispatch(
              isFormSubmit((success) => {
                if (success) {
                  navigate("/dashboard");
                } else {
                  navigate("/form");
                }
              })
            );
          }
        })
      );
      console.log("User signed in: ", user);
      return user;
    } catch (error: any) {
      const errorCode = (error as any).code;
      const errorMessage = (error as any).message;
      const email = (error as any).customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error(
        "Error signing in with Google: ",
        errorCode,
        errorMessage,
        email,
        credential
      );
    }
  };

  return (
    <div
      className="login"
      style={{
        width: "50%",
        backgroundColor: "transparent",
        padding: "20px",
        marginLeft: 50,
        marginRight: 50,
        borderRadius: 10,
        marginBottom: 15,
        opacity: 0.9,
      }}
    >
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <CustomInput
              label="Your email"
              placeholder="name@company.com"
              value={email}
              onChange={handleEmailChange}
              type="email"
            />
            {emailError && <p style={{ color: "red" }}>{emailError}</p>}
          </div>
          <div>
            <CustomInput
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={handlePasswordChange}
              type="password"
            />
            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
            <div
              style={{
                justifyContent: "flex-end",
                display: "flex",
                marginTop: 4,
              }}
            >
              <span
                onClick={handleForgotPasswordClick}
                style={{
                  fontSize: 14,
                  color: colors.black,
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Forgot Password?
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <CustomButton
              text={"Login"}
              style={{ minWidth: "200px", marginTop: 20, width: "100%" }}
              className="loginButton"
              isLoading={isLoginLoading}
            />
          </div>
        </form>

        <div
          style={{
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <div
            style={{
              height: 1,
              width: "90%",
              backgroundColor: colors.black,
            }}
          />
          <label style={{ paddingLeft: 10, paddingRight: 10 }}>Or</label>
          <div
            style={{
              height: 1,
              width: "90%",
              backgroundColor: colors.black,
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <CustomButton
            showIcon={true}
            iconSrc={images.Google}
            iconAlt="Google logo"
            text={"Countinuew with google"}
            isLoading={isGLoading}
            onClick={signInWithGoogle}
            style={{
              minWidth: "200px ",
              marginTop: 20,
              width: "100%",
              backgroundColor: colors.white,
              color: colors.black,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

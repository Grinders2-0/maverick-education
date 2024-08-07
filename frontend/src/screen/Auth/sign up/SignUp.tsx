import React, { useState } from "react";
import CustomInput from "../../../components/CustomInput/CustomInput";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { colors } from "../../../util/constant/colors";
import {
  validatePassword,
  validatePasswordMatch,
} from "../../../service/validators/passwordValidator";

import { GoogleAuthProvider } from "firebase/auth";
import { useAppDispatch } from "../../../redux/app/store";
import { signUp } from "../../../redux/action/auth/auth";
import { useNavigate } from "react-router-dom";

const isValidEmail = (email: string): string => {
  // Basic email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email) ? "" : "Invalid email address.";
};

const validateRequiredField = (value: string, fieldName: string): string => {
  return value.trim() === "" ? `${fieldName} is required.` : "";
};

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [conPassword, setConPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [firstNameError, setFirstNameError] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleConPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate fields
    const emailValidationError = isValidEmail(email);
    const passwordValidationError = validatePassword(password);
    const confirmPasswordValidationError = validatePasswordMatch(
      password,
      conPassword
    );
    const firstNameValidationError = validateRequiredField(
      firstName,
      "First Name"
    );
    const lastNameValidationError = validateRequiredField(
      lastName,
      "Last Name"
    );

    if (
      emailValidationError ||
      passwordValidationError ||
      confirmPasswordValidationError ||
      firstNameValidationError ||
      lastNameValidationError
    ) {
      setEmailError(emailValidationError);
      setPasswordError(passwordValidationError);
      setConfirmPasswordError(confirmPasswordValidationError);
      setFirstNameError(firstNameValidationError);
      setLastNameError(lastNameValidationError);
      return;
    }

    dispatch(
      signUp(email, password, conPassword, firstName, lastName, (success) => {
        if (success) {
          navigate("/form");
        }
      })
    );
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setFirstNameError("");
    setLastNameError("");
  };

  return (
    <div style={{ width: "50%", marginLeft: 50, marginRight: 50 }}>
      <div>
        <h1
          style={{
            alignItems: "center",
            fontSize: 24,
            textAlign: "center",
            marginBottom: 50,
            color: colors.primary,
          }}
        >
          Create an Account
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex" }}>
          <div
            style={{
              marginRight: 20,
              padding: 0,
              margin: 0,
              display: "flex",
              flex: 1,
            }}
          >
            <CustomInput
              label="First Name"
              placeholder="First Name"
              value={firstName}
              onChange={handleFirstNameChange}
            />
            {firstNameError && <p style={{ color: "red" }}>{firstNameError}</p>}
          </div>
          <div style={{ display: "flex", flex: 1 }}>
            <CustomInput
              label="Last Name"
              placeholder="Last Name"
              value={lastName}
              onChange={handleLastNameChange}
            />
            {lastNameError && <p style={{ color: "red" }}>{lastNameError}</p>}
          </div>
        </div>
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
        </div>
        <div>
          <CustomInput
            label="Confirm Password"
            placeholder="••••••••"
            value={conPassword}
            onChange={handleConPasswordChange}
            type="password"
          />
          {confirmPasswordError && (
            <p style={{ color: "red" }}>{confirmPasswordError}</p>
          )}
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
            text={"Sign Up"}
            style={{ minWidth: "200px", marginTop: 20, width: "100%" }}
            isLoading={isLoading}
            // onClick={onSingUPpress}
          />
        </div>
      </form>
    </div>
  );
};

export default SignUp;

export const validatePassword = (password: string): string => {
  if (!password) {
    return "Password is required.";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters long.";
  }
  // if (!/[A-Z]/.test(password)) {
  //   return "Password must contain at least one uppercase letter.";
  // }
  // if (!/[a-z]/.test(password)) {
  //   return "Password must contain at least one lowercase letter.";
  // }
  // if (!/[0-9]/.test(password)) {
  //   return "Password must contain at least one number.";
  // }
  // if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
  //   return "Password must contain at least one special character.";
  // }
  return "";
};

export const validatePasswordMatch = (
  password: string,
  confirmPassword: string
): string => {
  const trimmedPassword = password.trim();
  const trimmedConfirmPassword = confirmPassword.trim();

  if (trimmedPassword !== trimmedConfirmPassword) {
    return "Passwords do not match.";
  }
  return "";
};

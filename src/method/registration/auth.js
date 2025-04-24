import { StatusCodes } from "http-status-codes";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} from "../../errors";
import PersonalInfoModel from "../../models/registration/personalInfo";

const login = async (req, res) => {
  const { email, password, fcmToken, loginType, socialToken, isLogin } =
    req.body;
  if (!fcmToken || !loginType || !email) {
    throw new BadRequestError("Provide email, fcmToken, loginType");
  }

  if (
    !(loginType == "email" || loginType == "apple" || loginType == "google")
  ) {
    throw new BadRequestError("Unknown loginType");
  }

  let user;
  switch (loginType) {
    case "google":
    case "apple":
      if (!socialToken) {
        throw new BadRequestError("Provide socialToken, profileImage");
      }
      user = await PersonalInfoModel.findOneAndUpdate(
        { socialToken, email },
        { fcmToken },
        {
          new: true,
          runValidators: true,
        }
      );
      if (user) {
        const token = user.createJWT();
        user.password = undefined;
        res.status(StatusCodes.OK).json({ user, token, isNewUser: false });
        return;
      }
      break;
    case "email":
      if (!email || !password) {
        throw new BadRequestError("Provide email and password!");
      }
      user = await PersonalInfoModel.findOneAndUpdate(
        { socialToken, email },
        { fcmToken },
        {
          new: true,
          runValidators: true,
        }
      );
      if (user) {
        if (!isLogin) {
          throw new BadRequestError("User Already Exits Try Login!");
        }
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
          throw new UnauthenticatedError("Invalid Credentials!");
        }
        const token = user.createJWT();
        user.password = undefined;
        res.status(StatusCodes.OK).json({ user, token, isNewUser: false });
        return;
      } else if (isLogin) {
        throw new BadRequestError("User Not Found!");
      }
      break;
    default:
      throw new BadRequestError("Unknown loginType");
  }
  user = await PersonalInfoModel.create(req.body);
  user.password = undefined;
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user, token, isNewUser: true });
};

// const updateUser = async (req, res) => {
//   const { userId } = req.user;
//   const body = req.body;
//   const { userName, email, address, website } = body;
//   if (!userName || !email || !address) {
//     throw new BadRequestError("name, email and address are required");
//   }
//   body.role = undefined;
//   body.currentPackage = undefined;
//   body.removeAd = undefined;
//   body.loginType = undefined;
//   const tempUser = await User.findById(userId);
//   if (tempUser.loginType == "phone") {
//     body.phone = undefined;
//   } else {
//     body.email = undefined;
//   }
//   const user = await User.findByIdAndUpdate(userId, body, {
//     new: true,
//     runValidators: true,
//   });
//   if (!user) {
//     throw new NotFoundError(`No user found with id ${userId}`);
//   }
//   res.status(StatusCodes.OK).json({ user });
// };

const logout = async (req, res) => {
  const { userId } = req.user;
  console.log(req.user);

  await PersonalInfoModel.findByIdAndUpdate(userId, { push: "" });
  res.status(StatusCodes.OK).json({});
};

const changePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  const userData = await PersonalInfoModel.findOne({ email: email });

  if (!userData) {
    throw new NotFoundError(`No user found with email ${email}`);
  }
  const isPasswordCorrect = await userData.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials!");
  }
  console.log("ispass", isPasswordCorrect);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  const userUpdate = await User.findOneAndUpdate(
    { email: email },
    { password: hashedPassword },
    { new: true }
  );

  if (userUpdate) {
    userUpdate.password = undefined;
  }

  res.status(StatusCodes.OK).json({
    data: userUpdate,
    message: "password change successfully",
  });
};

// const sendMailOtp = async (req, res) => {
//   const { email } = req.body;
//   if (!email) {
//     throw new BadRequestError("Provide Email For Reset Password");
//   }
//   const userData = await User.findOne({ email: email });
//   if (!userData) {
//     throw new NotFoundError(`No user found with email ${email}`);
//   }
//   const otpCode = generateOTP();
//   const message = {
//     to: email,
//     otp: otpCode,
//   };
//   const otpSend = await sendMail(message);

//   if (otpSend) {
//     const data = jwt.sign(
//       { userId: userData._id, otpCode },
//       process.env.JWT_SECRET
//     );

//     res.status(StatusCodes.OK).json({ token_otp: data });
//   } else {
//     throw new NotFoundError(`There is an issue with sending OTP`);
//   }
// };
const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
};

// const verifyOtp = async (req, res) => {
//   const { email, otp, otp_token } = req.body;
//   if (!otp || !otp_token || !email) {
//     throw new BadRequestError("Provide OTP for reset Password");
//   }
//   const userData = await User.findOne({ email: email });
//   if (!userData) {
//     throw new NotFoundError(`No user found with email ${email}`);
//   }
//   const payload = jwt.verify(otp_token, process.env.JWT_SECRET);
//   const get_otp = payload.otpCode;
//   if (get_otp === otp) {
//     res
//       .status(StatusCodes.OK)
//       .json({ message: "OTP verification successful", isValid: true });
//   } else {
//     res.status(StatusCodes.OK).json({ message: "InValid OTP", isValid: false });
//   }
// };

const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    throw new BadRequestError("Provide Email For Reset Password");
  }
  const userData = await PersonalInfoModel.findOne({ email: email });
  if (!userData) {
    throw new NotFoundError(`No user found with email ${email}`);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const userUpdate = await PersonalInfoModel.findOneAndUpdate(
    { email: email },
    { password: hashedPassword },
    { new: true }
  );

  if (userUpdate) {
    userUpdate.password = undefined;
  } else {
    throw new NotFoundError("Error in updating Data");
  }
  res.status(StatusCodes.OK).json({
    data: userUpdate,
    message: "Password reset successfully",
  });
};
const deleteAccount = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequestError("Provide Email For Reset Password");
  }
  const userData = await PersonalInfoModel.findOneAndDelete({ email: email });
  if (!userData) {
    throw new NotFoundError(`No user found with email ${email}`);
  }

  res.status(StatusCodes.OK).json({ message: "Account deleted successfully" });
};
const webDeleteAccount = async (req, res) => {
  const { email, password } = req.body;
  const userData = await PersonalInfoModel.findOne({ email: email });

  if (!userData) {
    throw new NotFoundError(`No user found with email ${email}`);
  }
  const isPasswordCorrect = await userData.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials!");
  }

  await PersonalInfoModel.findOneAndDelete({ email: email });
  res.status(StatusCodes.OK).json({ message: "Account deleted successfully" });
};
const userAuthorize = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequestError("Provide Email For Reset Password");
  }
  const userData = await PersonalInfoModel.findOne({ email: email });
  if (!userData) {
    throw new NotFoundError(`No user found with email ${email}`);
  }
  res.status(StatusCodes.OK).json("OK");
};

const updateProfile = async (req, res) => {
  const { email, fName, lName } = req.body;
  if (!email || !fName) {
    throw new BadRequestError("Provid Name ");
  }
  const userData = await PersonalInfoModel.findOne({ email: email });
  if (!userData) {
    throw new NotFoundError(`No user found with email ${email}`);
  }
  const updatedData = await PersonalInfoModel.findOneAndUpdate(
    { email: email },
    {
      fName: fName,
      lName: lName,
    },
    { new: true }
  );
  if (updatedData) {
    updatedData.password = undefined;
  }
  res.status(StatusCodes.OK).json(updatedData);
};
export {
  login,
  logout,
  changePassword,
  deleteAccount,
  resetPassword,
  userAuthorize,
  webDeleteAccount,
  updateProfile,
};

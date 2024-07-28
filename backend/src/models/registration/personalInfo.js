import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const personalInfoSchema = new mongoose.Schema(
  {
    presonalId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      unique: false,
    },
    socialToken: {
      type: String,
      required: false,
      minlength: 0,
    },
    profileImage: {
      type: String,
      required: false,
    },
    loginType: {
      type: String,
      required: [true, "loginType required"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);
personalInfoSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  if (this.password && this.password.length > 0) {
    this.password = await bcrypt.hash(this.password, salt);
  }
});

// personalInfoSchema.methods.createJWT = function () {
//   return jwt.sign({ userId: this._id }, process.env.JWT_SECRET!);
// };

personalInfoSchema.methods.comparePassword = async function (
  canditatePassword
) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};
const PersonalInfoModel = mongoose.model("PersonalInfo", personalInfoSchema);

export default PersonalInfoModel;

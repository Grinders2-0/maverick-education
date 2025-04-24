import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide valid email",
      ],
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters long"],
      validate: {
        validator: function(value) {
          // Password should have at least one number and one special character
          return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/.test(value);
        },
        message: "Password must contain at least one number and one special character"
      },
      required: function() {
        return this.loginType === "email";
      }
    },
    profileImage: {
      type: String,
      required: false,
    },
    fName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lName: {
      type: String,
      required: false,
      trim: true,
    },
    socialToken: {
      type: String,
      required: false,
      minlength: 0,
    },
    fcmToken: {
      type: String,
      required: false,
      minlength: 0,
    },
    loginType: {
      type: String,
      enum: {
        values: ["email", "google", "apple"],
        message: "{VALUE} is not supported as login type"
      },
      required: [true, "Login type is required"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  // Only hash the password if it has been modified or is new
  if (!this.isModified("password") || !this.password) return;
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, role: this.role }, 
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME || "1d" }
  );
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

// Add indexes for frequently queried fields
UserSchema.index({ email: 1 });
UserSchema.index({ loginType: 1 });
UserSchema.index({ isDeleted: 1 });
UserSchema.index({ email: 1, loginType: 1 });

export default mongoose.model("User", UserSchema);

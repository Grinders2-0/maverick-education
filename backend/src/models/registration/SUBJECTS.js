import mongoose from "mongoose";
const { Schema } = mongoose;

const subjectsSchema = new Schema(
  {
    sname: { type: String, required: true },
    scode: { type: String, required: true },
    sem: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Subjects = mongoose.model("Subjects", subjectsSchema);
export default Subjects;

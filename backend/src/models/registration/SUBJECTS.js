import mongoose from 'mongoose';
const { Schema } = mongoose;

const subjectSchema = new Schema(
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

const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;

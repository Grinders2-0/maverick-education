import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
  subjectCode: { type: String, required: true },
  grade: { type: String, required: true },
});

const resultSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
  grades: [gradeSchema],
  spi: { type: String, required: true },
  cgpa: { type: String, required: true },
  semester: { type: String, required: true },
});

const Result = mongoose.model("Result", resultSchema);

export default Result;

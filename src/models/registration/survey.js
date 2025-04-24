import mongoose from "mongoose";
const { Schema } = mongoose;

const surveyResponseSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    attendance: {
      type: Number,
      enum: [1, 2, 3],
      required: true,
    },
    participation: {
      type: Number,
      enum: [1, 2, 3],
      required: true,
    },
    assignmentCompletion: {
      type: Number,
      enum: [1, 2, 3],
      required: true,
    },
    examMotivation: {
      type: Number,
      enum: [1, 2, 3],
      required: true,
    },
    preferredMaterial: {
      type: Number,
      enum: [1, 2, 3],
      required: true,
    },
    spi: {
      type: Number,
      required: true,
    },
    overallProfile: {
      type: Number,  // Ensure this field exists
      enum: [1, 2, 3], 
      required: true,  // This prevents validation errors
    },
    uniqueKey: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SurveyResponse = mongoose.model("SurveyResponse", surveyResponseSchema);
export default SurveyResponse;

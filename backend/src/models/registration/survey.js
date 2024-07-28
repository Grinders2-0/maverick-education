import mongoose from "mongoose";
const { Schema } = mongoose;

const surveyResponseSchema = new Schema(
  {
    surveyId: {
      type: String,
      required: true,
    },
    presonalId: {
      type: String,
      required: true,
    },
    attendance: {
      type: String,
      enum: ["Always (90-100%)", "Often (70-89%)", "Sometimes (50-69%)"],
      required: true,
    },
    participation: {
      type: String,
      enum: ["Very Actively", "Actively", "Neutral"],
      required: true,
    },
    assignmentCompletion: {
      type: String,
      enum: ["Always", "Most of the time", "Sometimes"],
      required: true,
    },
    examMotivation: {
      type: String,
      enum: ["Highly Motivated", "Moderately Motivated", "Neutral"],
      required: true,
    },
    preferredMaterial: {
      type: String,
      enum: [
        "Textbooks and Readings",
        "Videos and Lectures",
        "Interactive Simulations and Labs",
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SurveyResponse = mongoose.model("SurveyResponse", surveyResponseSchema);
export default SurveyResponse;

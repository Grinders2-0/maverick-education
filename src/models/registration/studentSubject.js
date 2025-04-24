import mongoose from "mongoose";

const { Schema } = mongoose;

const selectedSubjectsSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    semester: {
      type: String,
      required: true,
    },
    selectedSubjects: [
      {
        subjectId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subject",
          required: true,
        }
      }
    ],
  },
  {
    timestamps: true,
  }
);

const UserSubject = mongoose.model("UserSubject", selectedSubjectsSchema);

export default UserSubject;

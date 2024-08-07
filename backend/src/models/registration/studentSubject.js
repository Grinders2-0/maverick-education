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
      [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },{
    subjectCode: { type: String, required: true },
      }],
    ],
  },
  {
    timestamps: true,
  }
);

const UserSubject = mongoose.model("UserSubject", selectedSubjectsSchema);

export default UserSubject;

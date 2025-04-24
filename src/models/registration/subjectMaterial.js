import mongoose from "mongoose";
const { Schema } = mongoose;

// Schema for Courses within each subject
const courseSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true }
});

// Schema for Subjects within each semester
const subjectSchema = new Schema({
  subjectCode: { type: String, required: true },
  subjectName: { type: String, required: true },
  subjectUrl: { type: String, required: true },
  courses: [courseSchema]
});

// Schema for Subject Materials
const subjectMaterialSchema = new Schema(
  {
    semester: { type: String, required: true },
    subjects: [subjectSchema]
  },
  {
    timestamps: true,
  }
);

const SubjectMaterial = mongoose.model("SubjectMaterial", subjectMaterialSchema);
export default SubjectMaterial;
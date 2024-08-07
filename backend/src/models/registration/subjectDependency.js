const subjectDependencySchema = new Schema(
  {
    name: { type: String, required: true },
    subjectCode: { type: String, required: true },
    dependencies: [
      {
        subjectName: { type: String, required: true },
        subjectCode: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const SubjectDependency = mongoose.model(
  "SubjectDependency",
  subjectDependencySchema
);
export default SubjectDependency;

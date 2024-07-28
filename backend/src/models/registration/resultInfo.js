import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  resultId: {
    type: String,
    required: true,
  },
  presonalId: {
    type: String,
    required: true,
  },
  currentSemester: {
    type: String,
    required: true,
    enum: ["1", "2", "3", "4", "5", "6", "7", "8"],
  },
  subjects: [
    {
      semester: {
        type: String,
        required: true,
        enum: ["1", "2", "3", "4", "5", "6", "7", "8"],
      },
      subjectCode: {
        type: String,
        required: true,
      },
      subjectName: {
        type: String,
        required: true,
      },
      grade: {
        type: String,
        enum: ["AA", "AB", "BB", "BC", "CC", "CD", "DD", "FF"],
      },
    },
  ],
  spis: [
    {
      semester: {
        type: String,
        required: true,
        enum: ["1", "2", "3", "4", "5", "6", "7", "8"],
      },
      spi: {
        type: Number,
        required: true,
        min: 0,
        max: 10,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

const predefinedSubjects = {
    1: [],
  2: [
    { subjectCode: "3110005", subjectName: "Basic Electrical Engineering" },
    { subjectCode: "3110007", subjectName: "Environmental Science" },
    { subjectCode: "3110015", subjectName: "Mathematics - 2" },
    { subjectCode: "3110016", subjectName: "Basic Electronics" },
    { subjectCode: "3110002", subjectName: "English" },
  ],
  3: [
    {
      subjectCode: "3130004",
      subjectName: "Effective Technical Communication",
    },
    { subjectCode: "3130006", subjectName: "Probability and Statistics" },
    { subjectCode: "3130007", subjectName: "Indian Constitution" },
    { subjectCode: "3130008", subjectName: "Design Engineering 1 A" },
    { subjectCode: "3130702", subjectName: "Data Structures" },
    { subjectCode: "3130703", subjectName: "Database Management Systems" },
    { subjectCode: "3130704", subjectName: "Digital Fundamentals" },
  ],
  4: [
    { subjectCode: "3140702", subjectName: "Operating System" },
    { subjectCode: "3140705", subjectName: "Object-Oriented Programming - I" },
    {
      subjectCode: "3140707",
      subjectName: "Computer Organization & Architecture",
    },
    { subjectCode: "3140708", subjectName: "Discrete Mathematics" },
    {
      subjectCode: "3140709",
      subjectName: "Principles of Economics and Management",
    },
  ],
  5: [
    {
      subjectCode: "3150004",
      subjectName: "Contributor Personality Development Program",
    },
    {
      subjectCode: "3150005",
      subjectName: "Integrated Personality Development Course",
    },
    {
      subjectCode: "3150703",
      subjectName: "Analysis and Design of Algorithms",
    },
    { subjectCode: "3150709", subjectName: "Professional Ethics" },
    { subjectCode: "3150710", subjectName: "Computer Networks" },
    { subjectCode: "3150711", subjectName: "Software Engineering" },
    { subjectCode: "3150712", subjectName: "Computer Graphics" },
    { subjectCode: "3150713", subjectName: "Python for Data Science" },
    { subjectCode: "3150714", subjectName: "Cyber Security" },
  ],
  6: [
    {
      subjectCode: "3160002",
      subjectName: "Contributor Personality Development Program",
    },
    {
      subjectCode: "3160003",
      subjectName: "Integrated Personality Development Course",
    },
    { subjectCode: "3160704", subjectName: "Theory of Computation" },
    { subjectCode: "3160707", subjectName: "Advanced Java Programming" },
    { subjectCode: "3160712", subjectName: "Microprocessor and Interfacing" },
    { subjectCode: "3160713", subjectName: "Web Programming" },
    { subjectCode: "3160714", subjectName: "Data Mining" },
    { subjectCode: "3160715", subjectName: "System Software" },
    { subjectCode: "3160716", subjectName: "IOT and applications" },
    { subjectCode: "3160717", subjectName: "Data Visualization" },
  ],
  7: [
    { subjectCode: "3170001", subjectName: "Summer Internship" },
    { subjectCode: "3170701", subjectName: "Compiler Design" },
    {
      subjectCode: "3170710",
      subjectName: "Mobile Computing & Wireless Communication",
    },
    { subjectCode: "3170716", subjectName: "Artificial Intelligence" },
    { subjectCode: "3170717", subjectName: "Cloud Computing" },
    { subjectCode: "3170718", subjectName: "Information Retrieval" },
    { subjectCode: "3170719", subjectName: "Distributed System" },
    { subjectCode: "3170720", subjectName: "Information Security" },
    {
      subjectCode: "3170721",
      subjectName: "Parallel and Distributed Computing",
    },
    { subjectCode: "3170722", subjectName: "Big Data Analytics" },
    { subjectCode: "3170723", subjectName: "Natural Language Processing" },
    { subjectCode: "3170724", subjectName: "Machine Learning" },
    { subjectCode: "3170725", subjectName: "Digital Forensics" },
    { subjectCode: "3170726", subjectName: "Mobile Application Development" },
  ],
  8: [{ subjectCode: "3180701", subjectName: "Internship/ ProjectInternship" }],
};

const ResultInfoModel = mongoose.model("ResultInfo", resultSchema);

export default ResultInfoModel;

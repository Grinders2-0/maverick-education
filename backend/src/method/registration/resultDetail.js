import { v4 as uuidv4 } from "uuid";
import ResultInfo from "../../models/registration/resultInfo.js";
// import PersonalInfoModel from "../../models/registration/personalInfo.js";

const createResultInfo = async (req, res) => {
  try {

    const resultId = uuidv4();
    const presonalId = req.body.presonalId;
    const currentSemester = req.body.currentSemester;
    const subjects = req.body.subjects;
    const spis = req.body.spis;

    if (!presonalId || 
      !currentSemester || 
      !subjects ||
       !spis
      ) {
      return res.status(400).json({
        error: "presonalId, currentSemester, subjects, and spis are required",
      });
    }

    if (![1, 2, 3, 4, 5, 6, 7, 8].includes(Number(currentSemester))) {
      return res.status(400).json({ error: "Invalid semester number" });
    }

    const previousSemester = (Number(currentSemester) - 1).toString();

    // Ensure only the subjects for the previous semester are entered
    const subjectsValid = subjects.length > 0 && subjects.every(subject => subject.semester === previousSemester);

    // Ensure SPIs for all previous semesters are entered
    const requiredSPISemesters = Array.from({ length: Number(currentSemester) - 1 }, (_, i) => (i + 1).toString());
    const spisValid = requiredSPISemesters.every(semester => spis.some(spiEntry => spiEntry.semester === semester));

    if (!subjectsValid) {
      return res.status(400).json({
        error: `Subjects must be for the previous semester (${previousSemester}) only`,
      });
    }

    if (!spisValid) {
      return res.status(400).json({
        error: `SPIs for all previous semesters (${requiredSPISemesters.join(", ")}) are required`,
      });
    }

    const PersonalInfo = await PersonalInfoModel.findOne({
      presonalId,
      isDeleted: { $ne: true },
    });

    if (!PersonalInfo) {
      return res.status(404).send({
        error: "presonalId is not available. Enter correct presonalId.",
      });
    }

    // Check if ResultInfo already exists for the student and semester
    const existingResult = await ResultInfo.findOne({
      presonalId,
      currentSemester,
    });

    if (existingResult) {
      return res.status(400).json({
        error: "Result for this student and semester already exists",
      });
    }

    // Create and save the new ResultInfo document
    const newResult = new ResultInfo({
      resultId,
      presonalId,
      currentSemester,
      subjects: subjects.map((subject) => ({
        semester: subject.semester,
        subjectCode: subject.subjectCode,
        subjectName: subject.subjectName,
        grade: subject.grade,
      })),
      spis: spis.map((spiEntry) => ({
        semester: spiEntry.semester,
        spi: spiEntry.spi,
      })),
    });

    const resultData = await newResult.save();

    console.log("Saved Result Data:", resultData);

    res.status(201).json({
      message: "ResultInfo created successfully",
      resultData,
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
    console.error(error);
  }
};

export default createResultInfo;

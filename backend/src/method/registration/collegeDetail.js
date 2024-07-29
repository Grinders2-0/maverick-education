import { v4 as uuidv4 } from "uuid";
import CollegeInfoModel from "../../models/registration/collegeInfo.js";
import PersonalInfoModel from "../../models/registration/personalInfo.js";


const collegeInfoCreateMethod = async (req, res) => {
  try {
    // Extract data from request body
    const collegeId = uuidv4();
    const presonalId =  req.body.presonalId;
    const collegeName = req.body.collegeName;
    const department = req.body.department;
    const enrollmentYear = req.body.enrollmentYear;
    const expectedGraduationYear = req.body.expectedGraduationYear;
    const enrollmentNumber = req.body.enrollmentNumber;

    // Check if all required fields are provided
    if (
      !presonalId ||
      !collegeName ||
      !department ||
      !enrollmentYear ||
      !expectedGraduationYear
    ) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided" });
    }

    const PersonalInfo = await PersonalInfoModel.findOne({ presonalId, isDeleted: { $ne: true } });
        if (!PersonalInfo) {
            return res.status(404).send({ error: "presonalId is not available. Enter correct presonalId." });
        }

    // Create a new college info document
    const newCollegeInfo = new CollegeInfoModel({
      presonalId,
      collegeId,
      collegeName,
      department,
      enrollmentYear,
      expectedGraduationYear,
      enrollmentNumber,
    });

    // Save the new college info document
    const collegeInfoData = await newCollegeInfo.save();

    res.status(201).json({
      message: "College Information Added Successfully",
      collegeInfoData,
    });
  } catch (error) {
    res.status(500).json({ message: "error", error });
    console.error(error);
  }
};

export default collegeInfoCreateMethod;

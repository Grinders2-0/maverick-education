import CollegeInfoModel from "../../models/registration/collegeInfo.js";
import User from "../../models/User.js"; // Assuming this is the path to your User model

const collegeInfoCreateMethod = async (req, res) => {
  try {
    const {userId}=req.user;
    console.log(userId);
    // Extract data from request body
    const { collegeName,semester, department, enrollmentYear, expectedGraduationYear, enrollmentNumber } = req.body;

    // Check if all required fields are provided
    if (!userId || !semester|| !collegeName || !department || !enrollmentYear || !expectedGraduationYear) {
      return res.status(400).json({ error: "All required fields must be provided" });
    }

    // Check if the user ID exists and is not marked as deleted
    const user = await User.findOne({ _id: userId, isDeleted: { $ne: true } });
    if (!user) {
      return res.status(404).send({ error: "User ID is not available. Enter a correct user ID." });
    }

    // Create a new college info document
    const newCollegeInfo = new CollegeInfoModel({
      userId,
      collegeName,
      semester,
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

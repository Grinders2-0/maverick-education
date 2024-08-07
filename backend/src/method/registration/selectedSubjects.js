import Subject from '../../models/registration/SUBJECTS.js';
import UserSubject from '../../models/registration/studentSubject.js';
import CollegeInfoModel from "../../models/registration/collegeInfo.js";  // Import the CollegeInfoModel


const createSubject = async (req, res) => {
  try {
    const { sname, scode, sem } = req.body;

    if (!sname || !scode || !sem) {
      return res.status(400).json({ error: "All required fields must be provided" });
    }

    const newSubject = new Subject({ sname, scode, sem });

    const subjectData = await newSubject.save();

    res.status(201).json({ message: "Subject Added Successfully", subjectData });
  } catch (error) {
    res.status(500).json({ message: "error", error });
    console.error(error);
  }
};

const getSubjectsBySem = async (req, res) => {
  try {
    const { sem } = req.query;

    if (!sem) {
      return res.status(400).json({ error: "Semester is required" });
    }

    const subjects = await Subject.find({ sem, isDeleted: false });

    if (subjects.length === 0) {
      return res.status(404).json({ message: "No subjects found for the given semester" });
    }

    res.status(200).json({ message: "Subjects fetched successfully", subjects });
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


const selectedSubjects = async (req, res) => {
  const { subjectIds } = req.body;
  const userId = req.user.userId; // Extracted from the token by the middleware

  if (!userId || !subjectIds || !Array.isArray(subjectIds) || subjectIds.length === 0) {
    console.log('Invalid input data');
    return res.status(400).json({ message: 'Invalid input data' });
  }

  try {
    // Check if the subjects exist
    const subjects = await Subject.find({ '_id': { $in: subjectIds } });
    if (subjects.length !== subjectIds.length) {
      console.log('Some subjects not found');
      return res.status(404).json({ message: 'Some subjects not found' });
    }

    // Fetch the semester from CollegeInfoModel
    const collegeInfo = await CollegeInfoModel.findOne({ userId });
    if (!collegeInfo) {
      console.log('College info not found for user');
      return res.status(404).json({ message: 'College info not found for user' });
    }
    const sem = collegeInfo.semester;

    // Check if there's already a UserSubject document for the user and the same semester
    let userSubject = await UserSubject.findOne({ userId, semester: sem }).populate('selectedSubjects');
    if (!userSubject) {
      // Create a new document if it doesn't exist
      userSubject = new UserSubject({ userId, semester: sem, selectedSubjects: subjectIds });
    } else {
      // Update the selected subjects if the document exists
      userSubject.selectedSubjects = subjectIds;
    }

    await userSubject.save();
    // Populate the selectedSubjects field
    userSubject = await userSubject.populate('selectedSubjects');

    res.status(200).json({ message: 'Subjects selected successfully', userSubject, currentSemester: sem });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export { createSubject, getSubjectsBySem, selectedSubjects };

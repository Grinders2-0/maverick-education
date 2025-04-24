import Subject from '../../models/registration/SUBJECTS.js';
import UserSubject from '../../models/registration/studentSubject.js';
import CollegeInfoModel from "../../models/registration/collegeInfo.js";  // Import the CollegeInfoModel


const createSubject = async (req, res) => {
  try {
    // Verify admin authentication
    if (!req.admin) {
      // This should not happen because of the middleware, but just in case
      return res.status(403).json({ 
        success: false,
        message: "Unauthorized. Admin access required." 
      });
    }

    const { sname, scode, sem } = req.body;

    if (!sname || !scode || !sem) {
      return res.status(400).json({ 
        success: false,
        message: "All required fields must be provided",
        requiredFields: ["sname", "scode", "sem"]
      });
    }

    // Check if subject with same code already exists
    const existingSubject = await Subject.findOne({ scode, sem });
    if (existingSubject) {
      return res.status(409).json({
        success: false,
        message: `Subject with code ${scode} already exists in semester ${sem}`
      });
    }

    const newSubject = new Subject({ sname, scode, sem });
    const subjectData = await newSubject.save();

    res.status(201).json({ 
      success: true,
      message: "Subject added successfully", 
      subject: subjectData 
    });
  } catch (error) {
    console.error("Error creating subject:", error);
    res.status(500).json({ 
      success: false,
      message: "Internal server error while creating subject",
      error: error.message
    });
  }
};

const getSubjectsBySem = async (req, res) => {
  try {
    const { sem } = req.query;
    
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (!sem) {
      return res.status(400).json({ 
        success: false,
        message: "Semester is required" 
      });
    }

    // Count total for pagination info
    const total = await Subject.countDocuments({ sem, isDeleted: false });

    if (total === 0) {
      return res.status(404).json({ 
        success: false,
        message: "No subjects found for the given semester" 
      });
    }

    // Get subjects with pagination
    const subjects = await Subject.find({ sem, isDeleted: false })
      .skip(skip)
      .limit(limit);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.status(200).json({ 
      success: true,
      message: "Subjects fetched successfully", 
      count: subjects.length,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        limit,
        hasNextPage,
        hasPrevPage
      },
      subjects 
    });
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).json({ 
      success: false,
      message: "Internal server error while fetching subjects", 
      error: error.message 
    });
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

    // Create the selectedSubjects array with subjectId and subjectCode
    const selectedSubjectsArray = subjects.map(subject => ({
      subjectId: subject._id,
      subjectCode: subject.subjectCode,
    }));

    // Check if there's already a UserSubject document for the user and the same semester
    let userSubject = await UserSubject.findOne({ userId, semester: sem });
    if (!userSubject) {
      // Create a new document if it doesn't exist
      userSubject = new UserSubject({ userId, semester: sem, selectedSubjects: selectedSubjectsArray });
    } else {
      // Update the selected subjects if the document exists
      userSubject.selectedSubjects = selectedSubjectsArray;
    }

    await userSubject.save();
    // Populate the selectedSubjects field
    userSubject = await userSubject.populate('selectedSubjects.subjectId');

    res.status(200).json({ message: 'Subjects selected successfully', userSubject, currentSemester: sem });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export { createSubject, getSubjectsBySem, selectedSubjects };

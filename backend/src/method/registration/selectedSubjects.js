import Subjects from '../../models/registration/SUBJECTS.js'; // Ensure the casing matches

const addSubject = async (req, res) => {
  try {
    const { sname, scode, sem } = req.body;

    // Validate input
    if (!sname || !scode || !sem) {
      return res.status(400).json({ error: "All required fields must be provided" });
    }

    // Create a new subject document
    const newSubject = new Subjects({
      sname,
      scode,
      sem,
    });

    // Save the new subject document
    const subjectData = await newSubject.save();

    res.status(201).json({
      message: "Subject Added Successfully",
      subjectData,
    });
  } catch (error) {
    res.status(500).json({ message: "error", error });
    console.error(error);
  }
};

const getSubjectsBySem = async (req, res) => {
  try {
    const { sem } = req.query; // Get semester from query parameters

    if (!sem) {
      return res.status(400).json({ error: "Semester is required" });
    }

    // Find subjects by semester
    const subjects = await Subjects.find({ sem, isDeleted: false });

    if (subjects.length === 0) {
      return res.status(404).json({ message: "No subjects found for the given semester" });
    }

    res.status(200).json({
      message: "Subjects fetched successfully",
      subjects,
    });
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};




export { addSubject as createSubject, getSubjectsBySem };
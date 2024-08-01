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

    res.status(200).json({
      message: "Subjects fetched successfully",
      subjects,
    });
  } catch (error) {
    res.status(500).json({ message: "error", error });
    console.error(error);
  }
};


export default addSubject ;

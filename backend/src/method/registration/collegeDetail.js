import { uuidv4 } from 'uuid';
import CollegeInfo from '../../../model/collegeInfo/collegeInfo.js';

const collegeInfoCreateMethod = async (req, res) => {
    try {
        // Extract data from request body
        const collegeId = uuidv4();
        const collegeName = req.body.collegeName;
        const department = req.body.department;
        const enrollmentYear = req.body.enrollmentYear;
        const expectedGraduationYear = req.body.expectedGraduationYear;
        const enrollmentNumber = req.body.enrollmentNumber;

        // Check if all required fields are provided
        if (!collegeName || !department || !enrollmentYear || !expectedGraduationYear) {
            return res.status(400).json({ error: 'All required fields must be provided' });
        }

        // Create a new college info document
        const newCollegeInfo = new CollegeInfo({
            collegeId,
            collegeName,
            department,
            enrollmentYear,
            expectedGraduationYear,
            enrollmentNumber
        });

        // Save the new college info document
        const collegeInfoData = await newCollegeInfo.save();

        res.status(201).json({
            message: "College Information Added Successfully",
            collegeInfoData
        });

    } catch (error) {
        res.status(500).json({ message: "error", error });
        console.error(error);
    }
}

export default collegeInfoCreateMethod;

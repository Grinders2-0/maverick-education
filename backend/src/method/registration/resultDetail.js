import mongoose from 'mongoose';
import ResultInfo from './resultInfo.js';  // Adjust the path as needed

const createResultInfo = async (req, res) => {
    try {
        // Extract data from request body
            const resultId = uuidv4();
            currentSemester = req.body,
            subjects = req.body 
        
        // Validate required fields
        if (!studentId || !currentSemester || !subjects) {
            return res.status(400).json({ error: 'Student ID, current semester, and subjects are required' });
        }

        // Validate semester
        if (![1, 2, 3, 4, 5, 6, 7, 8].includes(currentSemester)) {
            return res.status(400).json({ error: 'Invalid semester number' });
        }

        // Validate subjects
        if (!Array.isArray(subjects) || subjects.length === 0) {
            return res.status(400).json({ error: 'Subjects must be a non-empty array' });
        }

        // Validate each subject
        for (const subject of subjects) {
            const { subjectCode, subjectName, grade } = subject;
            if (!subjectCode || !subjectName || !grade) {
                return res.status(400).json({ error: 'Each subject must have a subjectCode, subjectName, and grade' });
            }
            // Optionally, validate the grade if needed
        }

        // Check if ResultInfo already exists for the student and semester
        const existingResult = await ResultInfo.findOne({ studentId, currentSemester });

        if (existingResult) {
            return res.status(400).json({
                error: 'Result for this student and semester already exists'
            });
        }

        // Create and save the new ResultInfo document
        const newResult = new ResultInfo({
            resultId,
            currentSemester,
            subjects,  // Add subjects with their grades
        });

        const resultData = await newResult.save();

        res.status(201).json({
            message: "ResultInfo created successfully",
            resultData
        });
    } catch (error) {
        res.status(500).json({ message: "Error", error });
        console.log(error);
    }
}

export default createResultInfo;

import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
<<<<<<< HEAD
import fs from 'fs';
import Result from '../../models/registration/resultdata_fetch.js';  // Adjust the path to your Result model
import User from '../../models/User.js';
import NotFoundError from '../../errors/not-found.js';
=======
import Result from "../../models/registration/resultdata_fetch.js";  // Adjust the path as needed
>>>>>>> 7295046295b36e3eeb1c01404476488c7efa9458

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const fetchResultDetails = async (req, res) => {

<<<<<<< HEAD
    const { userId } = req.user;

    const user = await User.findById(userId);

    if(!user){
        throw new NotFoundError("User not found");
    }

    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const imagePaths = req.files.map(file => file.path); // Use file paths without quotes
    const pythonScript = path.join(__dirname, '..', '../method/registration', 'extract_grades.py');

    console.log('Image Paths:', imagePaths); // Debugging info

    exec(`python ${pythonScript} ${imagePaths.map(p => `"${p}"`).join(' ')}`, async (error, stdout, stderr) => {
=======
    execFile('python', [scriptPath, filePath], async (error, stdout, stderr) => {
>>>>>>> 7295046295b36e3eeb1c01404476488c7efa9458
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send('Error processing images');
        }

        try {
<<<<<<< HEAD
            const results = JSON.parse(stdout);

            // Save the results into the MongoDB database
            const savedResults = [];
            for (const resultData of results.semesters) {
                const { grades, spi, cgpa, semester } = resultData;
                
                const gradeEntries = Object.entries(grades).map(([subjectCode, grade]) => ({ subjectCode, grade }));
                const resultDocument = new Result({
                    userId: userId,
                    grades: gradeEntries,
                    spi,
                    cgpa,
                    semester
                });

                const savedResult = await resultDocument.save();
                savedResults.push(savedResult);
            }

            res.json(savedResults);

            // Clean up temporary files
            imagePaths.forEach(filePath => fs.unlinkSync(filePath)); // Use file paths without quotes
=======
            const result = JSON.parse(stdout);
            
            // Save the result to the database
            const gradesArray = Object.keys(result.grades).map(key => ({
                subjectCode: key,
                grade: result.grades[key]
            }));

            const newResult = new Result({
                grades: gradesArray,
                spi: result.spi,
                cgpa: result.cgpa,
                semester: result.semester
            });

            await newResult.save();

            return res.status(200).json(result);
>>>>>>> 7295046295b36e3eeb1c01404476488c7efa9458
        } catch (parseError) {
            console.error('Error parsing Python script output:', parseError);
            res.status(500).send('Error parsing results');
        }
    });
};

<<<<<<< HEAD

export const getStudentResult = async (req, res) => {
    const { userId } = req.user;

    try {
        const user = await User.findOne({ _id: userId, isDeleted: { $ne: true } });
        
        if (!user) {
            return res.status(404).send({ error: "User ID is not available. Enter a correct user ID." });
        }

        const results = await Result.find({ userId });

        return res.status(200).json({ results });
    } catch (dbError) {
        console.error('Database error:', dbError);
        return res.status(500).json({ error: 'Database error' });
    }
};
=======
export default fetchResultDetails;
>>>>>>> 7295046295b36e3eeb1c01404476488c7efa9458

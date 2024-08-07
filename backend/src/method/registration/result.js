import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import Result from '../../models/registration/resultdata_fetch.js';  // Adjust the path to your Result model
import User from '../../models/User.js';
import NotFoundError from '../../errors/not-found.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fetchResultDetails = async (req, res) => {

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
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send('Error processing images');
        }

        try {
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
        } catch (parseError) {
            console.error('Error parsing Python script output:', parseError);
            res.status(500).send('Error parsing results');
        }
    });
};

export default fetchResultDetails;

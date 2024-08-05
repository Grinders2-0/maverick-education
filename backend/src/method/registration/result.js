import fs from 'fs';
import path from 'path';
import { execFile } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Result from "../../models/registration/resultdata_fetch.js";  // Adjust the path as needed

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fetchResultDetails = (req, res) => {
    const scriptPath = 'D:/maverick-education/maverick-education/backend/src/method/registration/extract_grades.py';
    const filePath = path.join(__dirname, '../../public/temp', req.file.filename);

    execFile('python', [scriptPath, filePath], async (error, stdout, stderr) => {
        if (error) {
            console.error('Error executing Python script:', error);
            console.error('stderr:', stderr);
            return res.status(500).json({ error: 'Error processing the image' });
        }

        // Delete the temporary file after processing
        fs.unlinkSync(filePath);

        try {
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
        } catch (parseError) {
            console.error('Error parsing Python script output:', parseError);
            return res.status(500).json({ error: 'Error processing the image' });
        }
    });
};

export default fetchResultDetails;

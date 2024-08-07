import fs from "fs";
import path from "path";
import { execFile } from "child_process";
import { fileURLToPath } from "url";
import { dirname } from "path";
import Result from "../../models/registration/resultdata_fetch.js"; // Adjust the path as needed
import User from "../../models/User.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const fetchResultDetails = async (req, res) => {
  const scriptPath =
    "D:/Projects/maverick-education/maverick-education/backend/src/method/registration/extract_grades.py";
  const { userId } = req.user;

  try {
    const user = await User.findOne({ _id: userId, isDeleted: { $ne: true } });
    if (!user) {
      return res
        .status(404)
        .send({ error: "User ID is not available. Enter a correct user ID." });
    }

    const filePaths = req.files.map((file) =>
      path.join(__dirname, "../../public/temp", file.filename)
    );

    const results = await new Promise((resolve, reject) => {
      execFile(
        "python",
        [scriptPath, ...filePaths],
        (error, stdout, stderr) => {
          filePaths.forEach((filePath) => {
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath); // Ensure the files are deleted even if there is an error
            }
          });
          if (error) {
            console.error("Error executing Python script:", error);
            console.error("stderr:", stderr);
            reject({ error: "Error processing the images" });
          } else {
            try {
              const results = JSON.parse(stdout);
              resolve(results);
            } catch (parseError) {
              console.error("Error parsing Python script output:", parseError);
              reject({ error: "Error processing the images" });
            }
          }
        }
      );
    });

    // Aggregate and save the results to the database
    for (const result of results) {
      if (result.error) {
        console.error(result.error);
        continue;
      }

      const gradesArray = Object.keys(result.grades).map((key) => ({
        subjectCode: key,
        grade: result.grades[key],
      }));

      const newResult = new Result({
        userId: userId,
        grades: gradesArray,
        spi: result.spi,
        cgpa: result.cgpa,
        semester: result.semester,
      });

      await newResult.save();
    }

    return res.status(200).json({ results });
  } catch (dbError) {
    console.error("Database error:", dbError);
    return res.status(500).json({ error: "Database error" });
  }
};

export const getStudentResult = async (req, res) => {
  const { userId } = req.user;

  try {
    const user = await User.findOne({ _id: userId, isDeleted: { $ne: true } });

    if (!user) {
      return res
        .status(404)
        .send({ error: "User ID is not available. Enter a correct user ID." });
    }

    const results = await Result.find({ userId });

    return res.status(200).json({ results });
  } catch (dbError) {
    console.error("Database error:", dbError);
    return res.status(500).json({ error: "Database error" });
  }
};

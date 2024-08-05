import fs from "fs";
import path from "path";
import { execFile } from "child_process";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fetchResultDetails = (req, res) => {
  const scriptPath = path.join(__dirname, "extract_grades.py");
  const filePath = path.join(__dirname, "../../public/temp", req.file.filename);

  console.log("Script Path:", scriptPath);
  console.log("File Path:", filePath);

  execFile("python3", [scriptPath, filePath], (error, stdout, stderr) => {
    if (error) {
      console.error("Error executing Python script:", error);
      console.error("stderr:", stderr);
      return res.status(500).json({ error: "Error processing the image" });
    }

    // Delete the temporary file after processing
    fs.unlinkSync(filePath);

    try {
      const result = JSON.parse(stdout);
      return res.status(200).json(result);
    } catch (parseError) {
      console.error("Error parsing Python script output:", parseError);
      return res.status(500).json({ error: "Error processing the image" });
    }
  });
};

export default fetchResultDetails;

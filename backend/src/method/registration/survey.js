import { v4 as uuidv4 } from "uuid";
import SurveyResponse from "../../models/registration/survey.js";
import PersonalInfoModel from "../../models/registration/personalInfo.js";
import ResultInfoModel from "../../models/registration/resultInfo.js"; // Corrected import

// Function to categorize SPI
const categorizeSPI = (spi) => {
  if (spi === null) return null; // Handle null SPI case
  if (spi >= 8.0) return 1;
  if (spi >= 6.0) return 2;
  return 3;
};

const surveyResponseCreateMethod = async (req, res) => {
  try {
    // Extract data from request body
    const surveyId = uuidv4();
    const presonalId = req.body.presonalId;
    const attendance = req.body.attendance;
    const participation = req.body.participation;
    const assignmentCompletion = req.body.assignmentCompletion;
    const examMotivation = req.body.examMotivation;
    const preferredMaterial = req.body.preferredMaterial;

    // Check if all required fields are provided
    if (
      !presonalId ||
      attendance === undefined ||
      participation === undefined ||
      assignmentCompletion === undefined ||
      examMotivation === undefined ||
      preferredMaterial === undefined
    ) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided" });
    }

    // Check if PersonalInfo exists
    const personalInfo = await PersonalInfoModel.findOne({ presonalId, isDeleted: { $ne: true } });
    if (!personalInfo) {
      return res.status(404).send({ error: "presonalId is not available. Enter correct presonalId." });
    }

    // Fetch ResultInfo based on presonalId
    const resultInfo = await ResultInfoModel.findOne({ presonalId });
    if (!resultInfo) {
      return res.status(404).send({ error: "No result information found for the given presonalId." });
    }

    // Determine the previous semester based on the current semester
    const currentSemester = parseInt(resultInfo.currentSemester, 10);
    const previousSemester = (currentSemester - 1).toString();

    // Find SPI for the previous semester
    const previousSemesterSPI = resultInfo.spis.find(spi => spi.semester === previousSemester);
    const spi = previousSemesterSPI ? previousSemesterSPI.spi : null;

    // Categorize SPI
    const categorizedSPI = categorizeSPI(spi);

    // Generate unique key
    const uniqueKey = `${attendance}${participation}${assignmentCompletion}${examMotivation}${preferredMaterial}${categorizedSPI}`;

    // Create a new survey response document
    const newSurveyResponse = new SurveyResponse({
      presonalId,
      surveyId,
      attendance,
      participation,
      assignmentCompletion,
      examMotivation,
      preferredMaterial,
      spi: categorizedSPI, // Add the categorized SPI here
      uniqueKey,  // Add the new field here
    });

    // Save the new survey response document
    const surveyResponseData = await newSurveyResponse.save();

    res.status(201).json({
      message: "Survey Response Added Successfully",
      surveyResponseData,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding survey response", error });
    console.error(error);
  }
};

export default surveyResponseCreateMethod;

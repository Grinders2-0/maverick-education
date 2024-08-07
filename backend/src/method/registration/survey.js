import SurveyResponse from "../../models/registration/survey.js";
<<<<<<< HEAD
import ResultInfoModel from "../../models/registration/resultdata_fetch.js"; // Corrected import

=======
import PersonalInfoModel from "../../models/registration/personalInfo.js";
// import ResultInfoModel from "../../models/registration/resultInfo.js"; // Corrected import
import Result from "../../models/registration/resultdata_fetch.js";
>>>>>>> 7295046295b36e3eeb1c01404476488c7efa9458
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
    const userId = req.user.userId; // Extract userId from req.user set by middleware
    const attendance = req.body.attendance;
    const participation = req.body.participation;
    const assignmentCompletion = req.body.assignmentCompletion;
    const examMotivation = req.body.examMotivation;
    const preferredMaterial = req.body.preferredMaterial;

    console.log("user", userId);

    // Check if all required fields are provided
    if (
      !userId ||
      attendance === undefined ||
      participation === undefined ||
      assignmentCompletion === undefined ||
      examMotivation === undefined ||
      preferredMaterial === undefined
    ) {
      return res.status(400).json({ error: "All required fields must be provided" });
    }

<<<<<<< HEAD
    // Fetch ResultInfo based on userId
    const resultInfo = await ResultInfoModel.findOne({ userId });
=======
    // Check if PersonalInfo exists
    const personalInfo = await PersonalInfoModel.findOne({ presonalId, isDeleted: { $ne: true } });
    if (!personalInfo) {
      return res.status(404).send({ error: "presonalId is not available. Enter correct presonalId." });
    }

    // Fetch ResultInfo based on presonalId
    const resultInfo = await Result.findOne({ presonalId });
>>>>>>> 7295046295b36e3eeb1c01404476488c7efa9458
    if (!resultInfo) {
      return res.status(404).send({ error: "No result information found for the given userId." });
    }

    // Determine the previous semester based on the current semester
    const currentSemester = parseInt(resultInfo.semester);
    console.log(currentSemester);
    
    const previousSemester = (currentSemester).toString();

    // Find SPI for the previous semester
    // Since the spi field is not an array, you should directly access it
    const spi = resultInfo.spi || null;

    // Categorize SPI
    const categorizedSPI = categorizeSPI(spi);

    // Generate unique key
    const uniqueKey = ${attendance}${participation}${assignmentCompletion}${examMotivation}${preferredMaterial}${categorizedSPI};

    // Create a new survey response document
    const newSurveyResponse = new SurveyResponse({
      userId,
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
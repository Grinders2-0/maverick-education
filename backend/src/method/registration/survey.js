import { v4 as uuidv4 } from "uuid";
import SurveyResponse from "../../models/registration/survey.js";
import PersonalInfoModel from "../../models/registration/personalInfo.js";

const surveyResponseCreateMethod = async (req, res) => {
  try {
    // Extract data from request body
    const surveyId = uuidv4();
    const presonalId =  req.body.presonalId;
    const attendance = req.body.attendance;
    const participation = req.body.participation;
    const assignmentCompletion = req.body.assignmentCompletion;
    const examMotivation = req.body.examMotivation;
    const preferredMaterial = req.body.preferredMaterial;

    // Check if all required fields are provided
    if (
      !presonalId ||
      !attendance ||
      !participation ||
      !assignmentCompletion ||
      !examMotivation ||
      !preferredMaterial
    ) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided" });
    }

    const PersonalInfo = await PersonalInfoModel.findOne({ presonalId, isDeleted: { $ne: true } });
    if (!PersonalInfo) {
        return res.status(404).send({ error: "presonalId is not available. Enter correct presonalId." });
    }
    // Create a new survey response document
    const newSurveyResponse = new SurveyResponse({
      presonalId,
      surveyId,
      attendance,
      participation,
      assignmentCompletion,
      examMotivation,
      preferredMaterial,
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

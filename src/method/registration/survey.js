// import SurveyResponse from "../../models/registration/survey.js";
// import ResultInfoModel from "../../models/registration/resultdata_fetch.js"; // Corrected import

// // Function to categorize SPI
// const categorizeSPI = (spi) => {
//   if (spi === null) return null; // Handle null SPI case
//   if (spi >= 8.0) return 1;
//   if (spi >= 6.0) return 2;
//   return 3;
// };

// const surveyResponseCreateMethod = async (req, res) => {
//   try {
//     // Extract data from request body
//     const userId = req.user.userId; // Extract userId from req.user set by middleware
//     const attendance = req.body.attendance;
//     const participation = req.body.participation;
//     const assignmentCompletion = req.body.assignmentCompletion;
//     const examMotivation = req.body.examMotivation;
//     const preferredMaterial = req.body.preferredMaterial;

//     // Fetch ResultInfo based on userId
//     const resultInfo = await ResultInfoModel.findOne({ userId });
//     if (!resultInfo) {
//       return res.status(404).send({ error: "No result information found for the given userId." });
//     }

//     // Determine the previous semester based on the current semester
//     const currentSemester = parseInt(resultInfo.semester);
//     console.log(currentSemester);
    
//     const previousSemester = (currentSemester).toString();

//     // Find SPI for the previous semester
//     // Since the `spi` field is not an array, you should directly access it
//     const spi = resultInfo.spi || null;

//     // Categorize SPI
//     const categorizedSPI = categorizeSPI(spi);

//     // Generate unique key
//     const uniqueKey = `${attendance}${participation}${assignmentCompletion}${examMotivation}${preferredMaterial}${categorizedSPI}`;

//     // Create a new survey response document
//     const newSurveyResponse = new SurveyResponse({
//       userId,
//       attendance,
//       participation,
//       assignmentCompletion,
//       examMotivation,
//       preferredMaterial,
//       spi: categorizedSPI, // Add the categorized SPI here
//       uniqueKey,  // Add the new field here
//     });

//     // Save the new survey response document
//     const surveyResponseData = await newSurveyResponse.save();

//     res.status(201).json({
//       message: "Survey Response Added Successfully",
//       surveyResponseData,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error adding survey response", error });
//     console.error(error);
//   }
// };

// export default surveyResponseCreateMethod;


import SurveyResponse from "../../models/registration/survey.js";
import ResultInfoModel from "../../models/registration/resultdata_fetch.js";
import { DecisionTreeClassifier } from "ml-cart";

// Function to categorize SPI
const categorizeSPI = (spi) => {
  if (spi === null) return null;
  if (spi >= 8.0) return 1;
  if (spi >= 6.0) return 2;
  return 3;
};

// Corrected training data format (Separate features and labels)
const X = [ 
  [1, 1, 1, 1, 1, 1], 
  [2, 2, 2, 2, 2, 2], 
  [3, 3, 3, 3, 3, 3], 
  [1, 2, 1, 1, 1, 1], 
  [2, 1, 2, 2, 2, 2], 
  [3, 2, 3, 3, 3, 3], 
  [1, 1, 2, 1, 1, 1], 
  [2, 3, 2, 2, 3, 2], 
  [3, 3, 1, 3, 3, 3], 
  [1, 2, 2, 1, 2, 1]
];

const y = [1, 2, 3, 1, 2, 3, 1, 2, 3, 1]; // Labels

// Train the decision tree model
const classifier = new DecisionTreeClassifier();
classifier.train(X, y); // Ensure proper training format

// Function to predict student profile
const predictStudentProfile = (features) => classifier.predict([features])[0]; // Ensure input is in array format

// API to Save Survey Response & Predict Student Profile
const surveyResponseCreateMethod = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { attendance, participation, assignmentCompletion, examMotivation, preferredMaterial } = req.body;

    // Fetch SPI from ResultInfoModel
    const resultInfo = await ResultInfoModel.findOne({ userId });
    if (!resultInfo) {
      return res.status(404).json({ error: "No result information found for the given userId." });
    }

    const spiCategory = categorizeSPI(resultInfo.spi);

    // Feature input for ML model
    const featureInput = [attendance, participation, assignmentCompletion, examMotivation, preferredMaterial, spiCategory];

    // Predict overall profile
    const overallProfile = predictStudentProfile(featureInput);

    // Generate uniqueKey
    const uniqueKey = `${attendance}${participation}${assignmentCompletion}${examMotivation}${preferredMaterial}${spiCategory}`;

    // Create a new survey response
    const newSurveyResponse = new SurveyResponse({
      userId,
      attendance,
      participation,
      assignmentCompletion,
      examMotivation,
      preferredMaterial,
      spi: spiCategory,
      overallProfile,
      uniqueKey,  // Added missing field
    });

    await newSurveyResponse.save();

    res.status(201).json({
      message: "Survey Response Added Successfully",
      overallProfile,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding survey response", error });
  }
};


export default surveyResponseCreateMethod;

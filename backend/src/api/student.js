import express from "express";
// import personalInfoCreateMethod from "../method/registration/personalDetail.js";
import createResultInfo from "../method/registration/resultDetail.js";
import collegeInfoCreateMethod from "../method/registration/collegeDetail.js";
import createSurveyResponse from "../method/registration/survey.js";
import authenticateUser from "../middleware/authentication.js"
const studentApiRouter = express.Router();

// studentApiRouter.post("/personalInfo/create", personalInfoCreateMethod);
studentApiRouter.post("/ResultInfo/create", authenticateUser ,createResultInfo);
studentApiRouter.post("/CollegeInfo/create",authenticateUser , collegeInfoCreateMethod);
studentApiRouter.post("/survey/create",authenticateUser , createSurveyResponse);

export default studentApiRouter;

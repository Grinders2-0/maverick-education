import express from "express";
import personalInfoCreateMethod from "../method/registration/personalDetail.js";
import createResultInfo from "../method/registration/resultDetail.js";
import collegeInfoCreateMethod from "../method/registration/collegeDetail.js";
import createSurveyResponse from "../method/registration/survey.js";
const studentApiRouter = express.Router();

studentApiRouter.post("/personalInfo/create", personalInfoCreateMethod);
studentApiRouter.post("/ResultInfo/create", createResultInfo);
studentApiRouter.post("/CollegeInfo/create", collegeInfoCreateMethod);
studentApiRouter.post("/survey/create", createSurveyResponse);

export default studentApiRouter;

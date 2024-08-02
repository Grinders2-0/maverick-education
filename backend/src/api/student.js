import express from "express";
import createResultInfo from "../method/registration/resultDetail.js";
import collegeInfoCreateMethod from "../method/registration/collegeDetail.js";
import createSurveyResponse from "../method/registration/survey.js";
import authenticateUser from "../middleware/authentication.js"
import fetchResultDetails from "../method/registration/result.js";
import { upload } from "../middleware/multer.js";

const studentApiRouter = express.Router();

// studentApiRouter.post("/personalInfo/create", personalInfoCreateMethod);
studentApiRouter.post("/ResultInfo/create", authenticateUser ,createResultInfo);
studentApiRouter.post("/CollegeInfo/create",authenticateUser , collegeInfoCreateMethod);
studentApiRouter.post("/survey/create",authenticateUser , createSurveyResponse);
studentApiRouter.post("/survey/upload", upload.single('image') , fetchResultDetails);

export default studentApiRouter;
import express from "express";
import collegeInfoCreateMethod from "../method/registration/collegeDetail.js";
// import createSurveyResponse from "../method/registration/survey.js";
import authenticateUser from "../middleware/authentication.js"
import fetchResultDetails from "../method/registration/result.js";
import { upload } from "../middleware/multer.js";

const studentApiRouter = express.Router();

// studentApiRouter.post("/personalInfo/create", personalInfoCreateMethod);
studentApiRouter.post("/CollegeInfo/create",authenticateUser , collegeInfoCreateMethod);
// studentApiRouter.post("/survey/create",authenticateUser , createSurveyResponse);
studentApiRouter.post("/survey/upload", authenticateUser, upload.array('images') , fetchResultDetails);

export default studentApiRouter;
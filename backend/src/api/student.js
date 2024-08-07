import express from "express";
import authenticateUser from "../middleware/authentication.js";
import { checkUserExist } from "../method/registration/userExist.js";
import { selectedSubjects } from "../method/registration/selectedSubjects.js";
import createResultInfo from "../method/registration/resultDetail.js";
import collegeInfoCreateMethod from "../method/registration/collegeDetail.js";
import createSurveyResponse from "../method/registration/survey.js";

import { fetchResultDetails, getStudentResult } from "../method/registration/result.js";

import { upload } from "../middleware/multer.js";

const studentApiRouter = express.Router();

// Define routes
studentApiRouter.get("/isUserExist", authenticateUser, checkUserExist);
studentApiRouter.post("/ResultInfo/create", authenticateUser, createResultInfo);
studentApiRouter.post("/CollegeInfo/create", authenticateUser, collegeInfoCreateMethod);
studentApiRouter.post("/survey/create", authenticateUser, createSurveyResponse);
studentApiRouter.post("/survey/upload", upload.array('images', 10), authenticateUser, fetchResultDetails);
studentApiRouter.post("/selectSubject/form", authenticateUser, selectedSubjects);
studentApiRouter.get("/get/studentResult", authenticateUser, getStudentResult);

export default studentApiRouter;

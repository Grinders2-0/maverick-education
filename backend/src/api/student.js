import express from "express";
<<<<<<< HEAD
import authenticateUser from "../middleware/authentication.js";
import { checkUserExist } from "../method/registration/userExist.js";
import { selectedSubjects } from "../method/registration/selectedSubjects.js";
import createResultInfo from "../method/registration/resultDetail.js";
=======
>>>>>>> 7295046295b36e3eeb1c01404476488c7efa9458
import collegeInfoCreateMethod from "../method/registration/collegeDetail.js";
import createSurveyResponse from "../method/registration/survey.js";

import { fetchResultDetails, getStudentResult } from "../method/registration/result.js";

import { upload } from "../middleware/multer.js";

const studentApiRouter = express.Router();

<<<<<<< HEAD
// Define routes
studentApiRouter.get("/isUserExist", authenticateUser, checkUserExist);
studentApiRouter.post("/ResultInfo/create", authenticateUser, createResultInfo);
studentApiRouter.post("/CollegeInfo/create", authenticateUser, collegeInfoCreateMethod);
studentApiRouter.post("/survey/create", authenticateUser, createSurveyResponse);
studentApiRouter.post("/survey/upload", upload.array('images', 10), authenticateUser, fetchResultDetails);
studentApiRouter.post("/selectSubject/form", authenticateUser, selectedSubjects);
studentApiRouter.get("/get/studentResult", authenticateUser, getStudentResult);
=======
// studentApiRouter.post("/personalInfo/create", personalInfoCreateMethod);
studentApiRouter.post("/CollegeInfo/create",authenticateUser , collegeInfoCreateMethod);
studentApiRouter.post("/survey/create",authenticateUser , createSurveyResponse);
studentApiRouter.post("/survey/upload", upload.single('image') , fetchResultDetails);
>>>>>>> 7295046295b36e3eeb1c01404476488c7efa9458

export default studentApiRouter;

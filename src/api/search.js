import express from "express";
import { searchCourses, getAllCourses } from "../method/registration/search.js"; // Adjust the path as necessary
import { getCurrentSemesterSubjects } from "../method/registration/currentSemSubject.js";
import authenticateUser from "../middleware/authentication.js";

const searchApiRouter = express.Router();

searchApiRouter.get("/courses", searchCourses);
searchApiRouter.get("/allCourses", getAllCourses);
searchApiRouter.get(
  "/userSubject",
  authenticateUser,
  getCurrentSemesterSubjects
);

export default searchApiRouter;

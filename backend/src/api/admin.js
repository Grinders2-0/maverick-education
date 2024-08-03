import express from "express";
import { createSubject, getSubjectsBySem } from "../method/registration/selectedSubjects.js";

// Now you can use createSubject and getSubjectsBySem in this file.

const studentApiRouter = express.Router();

studentApiRouter.post("/admin", createSubject);
studentApiRouter.get("/subjects", getSubjectsBySem);

export default studentApiRouter;

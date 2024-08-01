import express from "express";

import crearteSubject from "../method/registration/selectedSubjects.js";
const studentApiRouter = express.Router();

studentApiRouter.post("/admin", crearteSubject);

export default studentApiRouter;

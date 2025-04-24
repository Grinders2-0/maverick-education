import express from "express";
import adminApiRouter from "../api/admin.js";

const adminRouter = express.Router();

adminRouter.use("/api/v1/admin", adminApiRouter);

export default adminRouter; 
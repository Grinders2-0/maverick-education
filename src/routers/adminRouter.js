import express from "express";
import adminApiRouter from "../api/admin.js";

const adminRouter = express.Router();

// Mount without the leading slash since app.js already adds /api/v1/admin prefix
adminRouter.use("", adminApiRouter);

console.log("Admin router mounted");

export default adminRouter; 
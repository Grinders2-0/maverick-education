import express from 'express';
import subjectApiRouter from '../api/admin.js';

const registerRoutes = express.Router();

registerRoutes.use("/subject", subjectApiRouter);

export default registerRoutes;
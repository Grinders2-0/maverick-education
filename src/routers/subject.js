import express from 'express';
import subjectApiRouter from '../api/subject.js';

const registerRoutes = express.Router();

registerRoutes.use("/subject", subjectApiRouter);

export default registerRoutes;
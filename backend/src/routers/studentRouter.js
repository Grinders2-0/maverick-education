import express from 'express';
import studentApiRouter from '../api/student.js';

const registerRoutes = express.Router();

registerRoutes.use("/student", studentApiRouter);

export default registerRoutes;
import express from 'express';
import registerApiRouter from '../api/auth.js';


const authRought = express.Router();

authRought.use("/api/v1/auth", registerApiRouter);

export default authRought;

import express from 'express';
import searchApiRouter from '../api/search.js';


const search = express.Router();

search.use("/search", searchApiRouter);

export default search;

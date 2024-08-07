import express from 'express';
import { searchCourses,getAllCourses } from '../method/registration/search.js'; // Adjust the path as necessary

const searchApiRouter = express.Router();

searchApiRouter.get('/courses', searchCourses);
searchApiRouter.get('/allCourses', getAllCourses);

export default searchApiRouter;

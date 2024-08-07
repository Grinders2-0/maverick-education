import Fuse from 'fuse.js';
import SubjectMaterial from '../../models/registration/subjectMaterial.js'; // Adjust the path as necessary
import { StatusCodes } from 'http-status-codes';

export const searchCourses = async (req, res) => {
    const { query } = req.query;

    try {
      // Fetch all subjects and their courses
      let materials = await SubjectMaterial.find({}).lean().exec();
      let courses = [];
  
      // Extract all courses from subjects
      materials.forEach(material => {
        material.subjects.forEach(subject => {
          subject.courses.forEach(course => {
            courses.push({ 
              name: course.name, 
              url: course.url, 
              subjectName: subject.subjectName, 
              subjectCode: subject.subjectCode, 
              subjectUrl: subject.subjectUrl, 
              semester: material.semester 
            });
          });
        });
      });
  
      // Fuse.js options
      const fuseOptions = {
        keys: ['name', 'subjectCode', 'subjectName'],
        minMatchCharLength: 3,
        distance: 50,
        threshold: 0.3, // Adjusted for better precision
      };
  
      const fuse = new Fuse(courses, fuseOptions);
      const searchData = fuse.search(query);
      const results = searchData.map(result => result.item);
  
      res.status(StatusCodes.OK).json({ data: results });
    } catch (dbError) {
      console.error('Database error:', dbError);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Database error' });
    }
};


export const getAllCourses = async (req, res) => {
    try {
      // Fetch all subjects and their courses
      const materials = await SubjectMaterial.find({}).lean().exec();
      let courses = [];
  
      // Extract all courses
      materials.forEach(material => {
        material.subjects.forEach(subject => {
          subject.courses.forEach(course => {
            courses.push({
              name: course.name,
              url: course.url,
              subjectName: subject.subjectName,
              subjectCode: subject.subjectCode,
              subjectUrl: subject.subjectUrl,
              semester: material.semester
            });
          });
        });
      });
  
      if (courses.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "No courses found" });
      }
  
      res.status(StatusCodes.OK).json({ message: "Courses fetched successfully", courses });
    } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error", error: error.message });
    }
  };
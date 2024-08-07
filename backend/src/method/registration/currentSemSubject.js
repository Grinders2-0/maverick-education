import express from 'express';
import UserSubject from '../../models/registration/studentSubject.js'; // Adjust the path as necessary
import CollegeInfoModel from '../../models/registration/collegeInfo.js';
import { StatusCodes } from 'http-status-codes';

export const getCurrentSemesterSubjects = async (req, res) => {
  const userId = req.user.userId; // Extracted from the token by the middleware

  try {
    // Fetch the current semester from CollegeInfoModel
    const collegeInfo = await CollegeInfoModel.findOne({ userId });
    if (!collegeInfo) {
      console.log('College info not found for user');
      return res.status(404).json({ message: 'College info not found for user' });
    }
    const currentSemester = collegeInfo.semester;

    // Fetch the UserSubject document for the current semester
    const userSubject = await UserSubject.findOne({ userId, semester: currentSemester }).populate('selectedSubjects.subjectId');
    if (!userSubject) {
      return res.status(404).json({ message: 'No subjects found for the current semester' });
    }

    res.status(StatusCodes.OK).json({ message: 'Subjects fetched successfully', userSubject });
  } catch (error) {
    console.error('Server error:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error', error: error.message });
  }
};

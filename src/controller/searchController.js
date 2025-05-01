import Question from "../models/Question.js";
import SubjectMaterial from "../models/registration/subjectMaterial.js";
import Fuse from 'fuse.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from "../errors/index.js";

// Search questions
export const searchQuestions = async (req, res) => {
  try {
    const { query, tags, page = 1, limit = 10 } = req.query;

    if (!query && !tags) {
      throw new BadRequestError("Please provide search query or tags");
    }

    // Build search query
    let searchQuery = {};
    if (query) {
      searchQuery.$text = { $search: query };
    }
    if (tags) {
      searchQuery.tags = { $in: tags.split(',') };
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Search questions with pagination
    const questions = await Question.find(searchQuery)
      .populate("userId", "fName lName email")
      .populate("answers.userId", "fName lName email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const total = await Question.countDocuments(searchQuery);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Questions fetched successfully",
      count: questions.length,
      pagination: {
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        limit
      },
      questions: questions.map(q => ({
        _id: q._id,
        userId: q.userId,
        question: q.question,
        tags: q.tags,
        answers: q.answers.map(a => ({
          _id: a._id,
          userId: a.userId,
          answerText: a.answerText,
          createdAt: a.createdAt
        })),
        createdAt: q.createdAt
      }))
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message
    });
  }
};

// Search study materials
export const searchStudyMaterials = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      throw new BadRequestError("Please provide search query");
    }

    // Fetch all study materials regardless of semester
    let materials = await SubjectMaterial.find({}).lean().exec();
    let courses = [];

    // Flatten all courses with subject and material data
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

    // Fuse.js configuration
    const fuseOptions = {
      keys: ['subjectName'],  // Focused only on subject name
      minMatchCharLength: 3,
      distance: 50,
      threshold: 0.3,
    };

    const fuse = new Fuse(courses, fuseOptions);
    const searchData = fuse.search(query);
    const results = searchData.map(result => result.item);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Study materials fetched successfully",
      count: results.length,
      materials: results
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message
    });
  }
};


// Combined search for both questions and study materials
export const combinedSearch = async (req, res) => {
  try {
    const { query, tags, semester, page = 1, limit = 10 } = req.query;

    if (!query) {
      throw new BadRequestError("Please provide search query");
    }

    // Search questions
    const questions = await Question.find({
      $text: { $search: query },
      ...(tags && { tags: { $in: tags.split(',') } })
    })
      .populate("userId", "fName lName email")
      .populate("answers.userId", "fName lName email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalQuestions = await Question.countDocuments({
      $text: { $search: query },
      ...(tags && { tags: { $in: tags.split(',') } })
    });

    // Search study materials
    let materials = await SubjectMaterial.find(semester ? { semester } : {}).lean().exec();
    let courses = [];

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

    const fuse = new Fuse(courses, {
      keys: ['name', 'subjectCode', 'subjectName'],
      minMatchCharLength: 3,
      distance: 50,
      threshold: 0.3,
    });

    const searchData = fuse.search(query);
    const studyMaterials = searchData.map(result => result.item);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Search results fetched successfully",
      questions: questions.map(q => ({
        _id: q._id,
        userId: q.userId,
        question: q.question,
        tags: q.tags,
        answers: q.answers.map(a => ({
          _id: a._id,
          userId: a.userId,
          answerText: a.answerText,
          createdAt: a.createdAt
        })),
        createdAt: q.createdAt
      })),
      materials: studyMaterials,
      pagination: {
        total: totalQuestions,
        totalPages: Math.ceil(totalQuestions / limit),
        currentPage: page,
        limit
      }
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message
    });
  }
}; 
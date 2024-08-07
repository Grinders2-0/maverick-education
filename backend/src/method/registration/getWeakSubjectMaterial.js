import NotFoundError from "../../errors/not-found.js";
import User from "../../models/User.js";
import Result from "../../models/registration/resultdata_fetch.js";
import CollegeInfoModel from "../../models/registration/collegeInfo.js";
import SubjectMaterial from '../../models/registration/subjectMaterial.js';
import UserSubject from "../../models/registration/studentSubject.js";
import SubjectDependency from "../../models/registration/subjectDependency.js";
import Subject from "../../models/registration/SUBJECTS.js";

export const getWeakSubjectMaterial = async (req, res) => {
    const { userId } = req.user;

    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new NotFoundError(`No user found with ID ${userId}`);
        }

        const collegeInfo = await CollegeInfoModel.findOne({ userId: userId });
        if (!collegeInfo) {
            return res.status(404).json({ message: `No college info found for user ID ${userId}` });
        }

        const currSemester = parseInt(collegeInfo.semester, 10);
        const previousSem = currSemester - 1;

        const results = await Result.find({ userId: userId, semester: previousSem.toString() }).exec();
        if (!results || results.length === 0) {
            return res.status(404).json({ message: "No results found for this user." });
        }

        const gradesOrder = ["AA", "AB", "BB", "BC", "CC", "CD", "DD"];
        const weakSubjects = results.flatMap(result =>
            result.grades
                .filter(({ grade }) => gradesOrder.indexOf(grade) > gradesOrder.indexOf("AA"))
                .map(({ subjectCode, grade }) => ({ subjectCode, grade }))
        );
        const weakSubjectCodes = weakSubjects.map(subject => subject.subjectCode);

        const userSubjects = await UserSubject.findOne({ userId: userId, semester: currSemester.toString() }).exec();
        if (!userSubjects) {
            return res.status(404).json({ message: "No selected subjects found for this user." });
        }

        console.log('userSubjects:', JSON.stringify(userSubjects));

        const selectedSubjectIds = userSubjects.selectedSubjects.map(subject => subject.subjectId);

        console.log('selectedSubjectIds:', selectedSubjectIds);

        const selectedSubjects = await Subject.find({ _id: { $in: selectedSubjectIds } }).exec();
        const selectedSubjectCodes = selectedSubjects.map(subject => subject.scode);

        console.log('selectedSubjectCodes:', selectedSubjectCodes);

        // Find subject dependencies for selected subjects
        const subjectDependencies = await SubjectDependency.find({
            subjectCode: { $in: selectedSubjectCodes }
        }).exec();

        console.log('subjectDependencies:', JSON.stringify(subjectDependencies, null, 2));

        // Filter dependencies that match weak subjects
        const dependentSubjects = subjectDependencies.flatMap(dep =>
            dep.dependencies.filter(dep => weakSubjectCodes.includes(dep.subjectCode))
        );

        console.log('dependentSubjects:', JSON.stringify(dependentSubjects, null, 2));

        const materialSubjectCodes = [...new Set([
            ...weakSubjectCodes,
            ...dependentSubjects.map(dep => dep.subjectCode)
        ])];

        // Fetch subject materials for these subject codes
        const subjectMaterials = await SubjectMaterial.find({
            'subjects.subjectCode': { $in: materialSubjectCodes }
        }).exec();

        console.log('subjectMaterials:', JSON.stringify(subjectMaterials, null, 2));

        // Prepare the response
        const response = subjectMaterials.flatMap(material =>
            material.subjects.filter(subject => materialSubjectCodes.includes(subject.subjectCode)).map(subject => ({
                subjectCode: subject.subjectCode,
                subjectName: subject.subjectName,
                materialUrl: subject.subjectUrl,
                courses: subject.courses
            }))
        );

        res.status(200).json({
            message: "Weak subject materials retrieved successfully",
            materials: response
        });

    } catch (error) {
        console.error('Error in getWeakSubjectMaterial:', error);
        res.status(500).json({ message: "An error occurred while retrieving weak subject materials" });
    }
};

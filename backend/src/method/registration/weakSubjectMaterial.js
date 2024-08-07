import NotFoundError from "../../errors/not-found.js";
import User from "../../models/User.js";
import Result from "../../models/registration/resultdata_fetch.js";

export const getWeakSubjectMaterial = async (req, res) => {
    const { userId } = req.user;

    const user = await User.findById(userId);
    if (!user) {
        throw new NotFoundError(`No user found with ${userId}`);
    }

    // Fetch the user's results
    const results = await Result.find({ userId: userId }).exec();
    if (!results || results.length === 0) {
        return res.status(404).json({ message: "No results found for this user." });
    }

    // Define the grades in descending order
    const gradesOrder = ["AA", "AB", "BB", "BC", "CC", "CD", "DD"];

    // Find subjects with grades below "BB"
    const weakSubjects = results.flatMap(result =>
        result.grades
            .filter(({ grade }) => gradesOrder.indexOf(grade) > gradesOrder.indexOf("BB"))
            .map(({ subjectCode, grade }) => ({ subjectCode, grade }))
    );

    if (weakSubjects.length > 0) {
        return res.status(200).json({
            message: "You are weak in the following subjects:",
            weakSubjects
        });
    } else {
        return res.status(200).json({
            message: "You have no weak subjects."
        });
    }
};

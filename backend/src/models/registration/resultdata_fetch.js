import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
    subjectCode: { type: String, required: true },
    grade: { type: String, required: true }
});

const resultSchema = new mongoose.Schema({
<<<<<<< HEAD
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
=======
>>>>>>> 7295046295b36e3eeb1c01404476488c7efa9458
    grades: [gradeSchema],
    spi: { type: String, required: true },
    cgpa: { type: String, required: true },
    semester: { type: String, required: true }
});

const Result = mongoose.model('Result', resultSchema);

export default Result;

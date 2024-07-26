import mongoose from "mongoose";

const personalInfoSchema = new mongoose.Schema({
    presonalId: {
        type: String,
        required: true
    },
    
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
    profilePicture: {
        type: String, 
    }
});

const PersonalInfoModel = mongoose.model("PersonalInfo", personalInfoSchema);

export default PersonalInfoModel;
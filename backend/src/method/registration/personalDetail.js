import { v4 as uuidv4 } from "uuid";
import PersonalInfoModel from "../../models/registration/personalInfo.js";
import { emailRegex, phoneRegex } from "../../utility/utils.js";

const personalInfoCreateMethod = async (req, res) => {
  try {
    console.log("work");
    // Extract data from request body
    const presonalId = uuidv4();
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;
    const city = req.body.city;
    const zipCode = req.body.zipCode;
    const dateOfBirth = req.body.dateOfBirth;
    const gender = req.body.gender;
    const profilePicture = req.body.profilePicture;

    // Check if all required fields are provided
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !zipCode ||
      !dateOfBirth ||
      !gender
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate email and phone format
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: "Invalid phone number format" });
    }

    // Check if email already exists
    const existingPersonalInfo = await PersonalInfoModel.findOne({ email });

    if (existingPersonalInfo) {
      return res.status(400).json({ error: "Email already exists" });
    } else {
      // Create a new personal info document
      const newPersonalInfo = new PersonalInfoModel({
        presonalId,
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        zipCode,
        dateOfBirth,
        gender,
        profilePicture,
      });

      // Save the new personal info document
      const personalInfoData = await newPersonalInfo.save();

      res.status(201).json({
        message: "Personal Information Added Successfully",
        personalInfoData,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "error", error });
    console.error(error);
  }
};

export default personalInfoCreateMethod;

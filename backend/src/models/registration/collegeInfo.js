import mongoose from "mongoose";

const collegeInfoSchema = new mongoose.Schema(
  {
    collegeId: {
      type: String,
      required: true,
    },
    presonalId: {
      type: String,
      required: true,
    },
    collegeName: {
      type: String,
      required: true,
      enum: [
        "A. D. Patel Institute of Technology, Karamsad",
        "Ahmedabad Institute of Technology, Gota, Ahmedabad",
        "Atmiya Institute of Technology & Science, Rajkot",
        "B. H. Gardi College of Engineering & Technology, Rajkot",
        "Babaria Institute of Technology, Varnama",
        "Bhagwan Mahavir College of Engineering & Technology, Surat",
        "Birla Vishvakarma Mahavidyalaya, Vallabh Vidyanagar",
        "C. K. Pithawalla College of Engineering & Technology, Surat",
        "G. H. Patel College of Engineering & Technology, V V Nagar",
        "Gandhinagar Institute of Technology, Gandhinagar",
        "Government Engineering College, Sector - 28, Gandhinagar",
        "Government Engineering College, Bharuch",
        "Government Engineering College, Bhuj",
        "Government Engineering College, Modasa",
        "Vishwakarma Government Engineering College, Chandkheda",
        "Dr. Jivraj Mehta Institute of Technology, Mogar, Anand",
        "Laxmi Institute of Technology, Sarigam",
        "Marwadi Education Foundation's Group of Institutions, Rajkot",
        "Noble Group of Institutions, Junagadh",
        "Sigma Institute of Engineering, Vadodara",
        "Silver Oak College of Engineering & Technology, Ahmedabad",
        "Sardar Vallabhbhai Patel Institute of Technology, Vasad",
        "Shantilal Shah Engineering College, Bhavnagar",
        "Sarvajanik College of Engineering & Technology, Surat",
        "Shri S'ad Vidya Mandal Institute of Technology, Bharuch",
        "Tatva Institute of Technological Studies, Modasa",
        "Samarth College of Engineering and Technology, Himmatnagar",
        "Shankersinh Vaghela Bapu Institute of Technology, Unava, Gandhinagar",
        "S. P. B. Patel Engineering College, Mehsana",
        "Shree Swami Atmanand Saraswati Institute of Technology, Surat",
        "Shri Labhubhai Trivedi Institute of Engineering & Technology, Rajkot",
        "Venus International College of Technology, Bhoyan Rathod, Gandhinagar",
        "Arrdekta Institute of Technology, Radhiwad, Khedbrahma",
        "Arham Veerayatan Institute of Engineering, Technology & Research, Kutch",
        "Lalji Chaturbhai Institute of Technology, Bhandu",
        "Gandhinagar Institute of Technology, Kathwada",
        "Kankeshwari Devi Institute of Technology, Jamnagar",
        "HJD Institute of Technical Education and Research, Kera",
        "Darshan Institute of Engineering & Technology, Rajkot-Morbi Highway, Hadala",
        "Dr. Subhash Technical Campus, Junagadh",
        "Kalol Institute of Technology & Research Centre, Kalol",
        "Merchant Institute of Technology, Piludara",
        "Shree Satsangi Saketdham 'Ram Ashram' Group of Institutions, Vadasma",
      ],
    },
    // courseName: {
    //     type: String,
    //     required: true
    // },
    department: {
      type: String,
      required: true,
    },
    enrollmentYear: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    expectedGraduationYear: {
      type: Number,
      required: true,
    },
    enrollmentNumber: {
      type: Number,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const CollegeInfoModel = mongoose.model("CollegeInfo", collegeInfoSchema);

export default CollegeInfoModel;

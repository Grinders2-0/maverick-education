import { IChatbot, ICollegeInfo, IServay } from "../../@types/form";
import { instanceWithAuth, instanceWithoutAuth } from "../../util/axiosHandler";

const getSubject = async (semester: string) => {
  return instanceWithAuth
    .get("subject/subjects", { params: { sem: semester } })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log("error in get subject api ", e);
    });
};

const collegeInfo = async (body: ICollegeInfo) => {
  return instanceWithAuth
    .post("student/collegeInfo/create", body)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log("error in create college Info api ", e);
    });
};
const studentSubject = async (body: string[]) => {
  const data = {
    subjectIds: body,
  };
  return instanceWithAuth
    .post("student/selectSubject/form", data)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log("no subject are selected ", e);
    });
};
const uploadResult = async (body: FormData) => {
  return instanceWithAuth
    .post("student/survey/upload", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      alert("333");
      console.log("Error in uploading image ", e);
    });
};

const addSurvey = async (body: IServay) => {
  return instanceWithAuth
    .post("student/survey/create", body)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log("Error in add survey api ", e);
    });
};
const formExist = async () => {
  return instanceWithAuth
    .get("student/isUserExist")
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log("Error in add survey api ", e);
    });
};

// for cgpa  spi data get
const getStudentResult = async () => {
  return instanceWithAuth
    .get("student/get/studentResult")
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log("Error in get reults api ", e);
    });
};
const searchCourse = async (text: string) => {
  return instanceWithAuth
    .get("search/courses", {
      params: {
        query: text,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log("Error in get serach corse reults api ", e);
    });
};
const getAllCourse = async () => {
  return instanceWithAuth
    .get("search/allCourses")
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log("Error in get all corse reults api ", e);
    });
};

const getSubjectOfSem = async () => {
  return instanceWithAuth
    .get("search/userSubject")
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log("Error in get all corse reults api ", e);
    });
};

const geminiPro = async (body: IChatbot) => {
  return instanceWithAuth
    .post("chat/chatbot", body)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log("Error in get all corse reults api ", e);
    });
};

const weakSubjectMaterail = async () => {
  return instanceWithAuth
    .get("student/get/weakSubjectMaterial")
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log("Error in get all corse reults api ", e);
    });
};

export default {
  getSubject,
  collegeInfo,
  studentSubject,
  uploadResult,
  addSurvey,
  formExist,
  getStudentResult,
  searchCourse,
  getAllCourse,
  getSubjectOfSem,
  geminiPro,
  weakSubjectMaterail,
};

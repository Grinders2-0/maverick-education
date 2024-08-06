import { ICollegeInfo, IServay } from "../../@types/form";
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
      alert("college");
      console.log("error in create college Info api ", e);
    });
};
const studentSubject = async (body: string[]) => {
  alert(body);
  const data = {
    subjectIds: body,
  };
  return instanceWithAuth
    .post("student/selectSubject/form", data)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      alert("222");

      console.log("no subject are selected ", e);
    });
};
const uploadResult = async (body: File[]) => {
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
      alert("44");
      console.log("Error in add survey api ", e);
    });
};

export default {
  getSubject,
  collegeInfo,
  studentSubject,
  uploadResult,
  addSurvey,
};

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

export default { getSubject };

import { UnauthenticatedError } from "../errors";

const authAPIkey = async (req, _res, next) => {
  // check header
  const apikey = req.headers.apikey;
  console.log(apikey, apikey == process.env.API_KEY);

  if (!apikey || !(apikey == process.env.API_KEY)) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  next();
};

export default authAPIkey;

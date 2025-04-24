import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  console.error("Error:", err);

  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, please try again later",
  };

  // Handle specific error types
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  
  if (err.name === "CastError") {
    customError.msg = `No item found with id: ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }
  
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    ).join(', ')} field, please choose another value`;
    customError.statusCode = StatusCodes.CONFLICT;
  }

  // JWT related errors
  if (err.name === "JsonWebTokenError") {
    customError.msg = "Invalid token. Please log in again.";
    customError.statusCode = StatusCodes.UNAUTHORIZED;
  }
  
  if (err.name === "TokenExpiredError") {
    customError.msg = "Your token has expired. Please log in again.";
    customError.statusCode = StatusCodes.UNAUTHORIZED;
  }

  return res.status(customError.statusCode).json({ 
    success: false,
    message: customError.msg 
  });
};

export default errorHandlerMiddleware;

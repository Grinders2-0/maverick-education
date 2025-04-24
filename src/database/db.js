import mongoose from "mongoose";
import logger from "../utility/logger.js";

const databaseConnection =
  process.env.MONGODB_URI || "mongodb://localhost:27017/maverick-education";

mongoose
  .connect(databaseConnection)
  .then(() => {
    logger.info("MongoDB database connected successfully");
  })
  .catch((error) => {
    logger.error(`Error connecting to the database: ${error.message}`);
  });

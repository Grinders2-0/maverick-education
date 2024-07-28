import mongoose from "mongoose";

const databaseConnection =
  "mongodb+srv://harshil:Harshil@backend.ye2d7vr.mongodb.net/?retryWrites=true&w=majority&appName=backend";

mongoose
  .connect(databaseConnection)
  .then(() => {
    console.log("MongoDB database connected successfully");
  })
  .catch((error) => {
    console.error("Error connecting to the database");
    console.error(error);
  });

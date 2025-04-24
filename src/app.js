import express from "express";
import "express-async-errors";
import cors from "cors";
import "dotenv/config";
import registerRoutes from "./routers/studentRouter.js";
import subjects from "./routers/subject.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";
import helmet from "helmet";
import authRouter from "./routers/authRouter.js";
import searchApi  from "./routers/search.js";
// import chatbotApi  from "./routers/chatbot.js";
import chatbotApi from "./routers/chatbot.js";
import questionRoutes from "./routers/questionRoutes.js";
import adminRouter from "./routers/adminRouter.js";
import logger from "./utility/logger.js";

// Use port from environment variables or default to 3001
const port = process.env.PORT || 3001;

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(registerRoutes);
app.use(subjects);
app.use(searchApi);
app.use(chatbotApi);
app.use(questionRoutes);
app.use(adminRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

// Global error handlers
process.on('uncaughtException', (err) => {
  if (err.code === 'EADDRINUSE') {
    // This will be handled by the server.on('error') handler
    return;
  }
  logger.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error(`Unhandled Rejection: ${reason}`);
});

const server = app.listen(port, () => {
  logger.info(`Server running at port ${port}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const newPort = parseInt(port) + 1;
    logger.warn(`Port ${port} is already in use. Trying another port...`);
    app.listen(newPort, () => {
      logger.info(`Server running at port ${newPort} (port ${port} was in use)`);
    });
  } else {
    logger.error(`Server error: ${err.message}`);
  }
});

// Database connection message will be logged in server.js or db.js

// Error handler middleware for Express errors
app.use((err, req, res, next) => {
  logger.error(`Express error: ${err.message}`);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

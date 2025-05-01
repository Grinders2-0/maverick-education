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
import searchApi from "./routers/search.js";
import chatbotApi from "./routers/chatbot.js";
import questionRoutes from "./routers/questionRoutes.js";
import logger from "./utility/logger.js";

// Directly import and use the admin API router
import adminrouter from "./api/admin.js";

// Use port from environment variables or default to 3001
const port = process.env.PORT || 3001;

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use("/api/v1/search", searchApi);
app.use(questionRoutes);
app.use("/api/v1/admin", adminrouter);
app.use(registerRoutes);
app.use(subjects);
app.use(chatbotApi);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    app.listen(port, () => {
      logger.info(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    logger.error(error);
  }
};

start();

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

// Error handler middleware for Express errors
app.use((err, req, res, next) => {
  logger.error(`Express error: ${err.message}`);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

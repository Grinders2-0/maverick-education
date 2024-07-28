import express from "express";
import "express-async-errors";
import cors from "cors";
import "dotenv/config";
import registerRoutes from "./routers/studentRouter.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";
import helmet from "helmet";
import authRouter from "./routes/auth.js";

const port = process.env.PORT || 3001;

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(registerRoutes);
app.use("auth", authRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});

app.use((err, req, res, next) => {
  console.log(err);
});

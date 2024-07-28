import express from "express";
import registerRoutes from "./routers/studentRouter.js";
import errorHandlerMiddleware from "./middleware/error-handler";
import notFoundMiddleware from "./middleware/not-found";
const port = 3001;

const app = express();

app.use(express.json());

app.use(registerRoutes);
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});

app.use((err, req, res, next) => {
  console.log(err);
});

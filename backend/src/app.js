import express from 'express';
import registerRoutes from './routers/studentRouter.js';

const port = 3001;

const app = express();

app.use(express.json());

app.use(registerRoutes);

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});

app.use((err, req,res,next) => {
    console.log(err);
})
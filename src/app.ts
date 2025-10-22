import express, { Request, Response } from 'express';
import cors from "cors"
import compression from "compression"
import { blogRouter } from './app/modules/blog/blog.routes';
import notFoundRoute from './app/middlewares/notFoundRoute';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { authRouter } from './app/modules/auth/auth.routes';
import { projectRouter } from './app/modules/project/project.routes';

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(compression());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/blog", blogRouter);
app.use("/api/project", projectRouter);

app.get("/", (req: Request, res: Response) => {
     res.status(200).json({
          message: "Welcome to My Portfolio Website"
     })
})

app.use(globalErrorHandler)

app.use(notFoundRoute)

export default app;
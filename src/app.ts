import express, { Request, Response } from 'express';
import cors from "cors"
import compression from "compression"
import { blogRouter } from './app/modules/blog/blog.routes';

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(compression);
app.use(express.json());

app.use("/api/v1/user", blogRouter);

app.get("/", (req: Request, res: Response) => {
     res.status(200).json({
          message: "Welcome to My Portfolio Website"
     })
})

export default app;
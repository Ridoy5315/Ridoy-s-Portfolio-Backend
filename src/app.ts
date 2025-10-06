import express, { Request, Response } from 'express';
import cors from "cors"
import compression from "compression"

const app = express();

app.use(cors());
app.use(compression);
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
     res.status(200).json({
          message: "Welcome to My Portfolio Website"
     })
})

export default app;
import express from "express";
import { ProjectController } from "./project.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { multerUpload } from "../../config/multer.config";

const router = express.Router();

router.post(
  "/",
  checkAuth(),
  multerUpload.single("file"),
  ProjectController.createProject
);

export const projectRouter = router;

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
router.get("/", ProjectController.getAllProjects)
router.get("/:id", ProjectController.getProjectById)
router.patch("/:id", multerUpload.single("file"), ProjectController.updateProjectById)

export const projectRouter = router;

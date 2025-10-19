import express from "express";
import { BlogController } from "./blog.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { multerUpload } from "../../config/multer.config";

const router = express.Router();

router.post(
  "/",
  checkAuth(),
  multerUpload.single("file"),
  BlogController.createBlog
);

router.get("/", BlogController.getAllBlogs )

export const blogRouter = router;

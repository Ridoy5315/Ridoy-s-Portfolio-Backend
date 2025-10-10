import express from 'express';
import { BlogController } from './blog.controller';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '@prisma/client';
import { validateRequest } from '../../middlewares/validateRequest';
import { createBlogSchema } from './blog.validation';

const router = express.Router();

router.post("/", checkAuth(Role.OWNER), validateRequest(createBlogSchema), BlogController.createBlog)

export const blogRouter = router;
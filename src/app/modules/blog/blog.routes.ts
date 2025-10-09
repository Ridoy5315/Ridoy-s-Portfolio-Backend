import express from 'express';
import { BlogController } from './blog.controller';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '@prisma/client';

const router = express.Router();

router.post("/", checkAuth(Role.OWNER), BlogController.createBlog)

export const blogRouter = router;
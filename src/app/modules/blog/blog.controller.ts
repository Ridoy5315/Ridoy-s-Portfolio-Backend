import httpStatus from 'http-status-codes';
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { BlogService } from "./blog.service";
import { sendResponse } from "../../utils/sendResponse";
import AppError from '../../errorHelpers/AppError';

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const { title, description, content, author, isFeatured, tags } = req.body;
  const payload = {
    title,
    description,
    content,
    author,
    isFeatured: isFeatured === "true",
    tags: typeof tags === "string" ? tags.split(",").map(t => t.trim()) : tags,
    file: req.file?.path ?? '',
  };

console.log(payload)

  const result = await BlogService.createBlog(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Blog Created Successfully",
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.getAllBlogs()

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Blogs Retrieved Successfully",
    data: result,
  });
});

const getBlogById = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.getBlogById(Number(req.params.id))

  if(!result) {
   throw new AppError(httpStatus.BAD_REQUEST, "Blog not found");
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Blog Retrieved Successfully",
    data: result,
  });
});

export const BlogController = {
  createBlog,
  getAllBlogs,
  getBlogById
};

import httpStatus from 'http-status-codes';
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { BlogService } from "./blog.service";
import { sendResponse } from "../../utils/sendResponse";

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const { title, description, content, author, isFeatured, tags } = req.body;
  const payload = {
    title,
    description,
    content,
    author,
    isFeatured: isFeatured === "true",
    tags: typeof tags === "string" ? tags.split(",").map(t => t.trim()) : tags,
    file: req.file?.path,
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

export const BlogController = {
  createBlog,
};

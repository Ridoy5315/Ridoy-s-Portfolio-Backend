import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { BlogService } from "./blog.service";


const createBlog = catchAsync( async (req: Request, res: Response) => {
     try {
          const result = await BlogService.createBlog(req.body)
          res.status(201).json(result)
     } catch (error) {
          res.status(500).send(error)
     }
})


export const BlogController = {
     createBlog
}
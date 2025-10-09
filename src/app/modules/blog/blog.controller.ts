import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";


const createBlog = catchAsync( async (req: Request, res: Response) => {
     console.log(req.body)
})


export const BlogController = {
     createBlog
}
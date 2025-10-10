import { Blog, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";


const createBlog = async(payload: Prisma.BlogCreateInput): Promise<Blog> => {
     const result = await prisma.blog.create({
          data: payload
     })

     return result;
}

export const BlogService = {
     createBlog
}
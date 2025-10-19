import { Blog, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";


const createBlog = async(payload: Prisma.BlogCreateInput): Promise<Blog> => {
     const result = await prisma.blog.create({
          data: payload
     })

     return result;
}

const getAllBlogs = async() => {
     const result = await prisma.blog.findMany({
          orderBy: {
            createdAt: "desc"
        }
     });

     return result;
}

export const BlogService = {
     createBlog,
     getAllBlogs
}
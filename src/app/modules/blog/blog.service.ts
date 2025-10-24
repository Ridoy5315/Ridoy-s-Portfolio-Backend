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

const getBlogById = async(id: number) => {
     const result = await prisma.$transaction(async (tx) => {
          await tx.blog.update({
               where: {id},
               data: {
                    views: {
                         increment: 1
                    }
               }
          })

          return await tx.blog.findUnique({
               where: {id}
          })
     })

     return result
}

const updateBlogById = async(id: number, payload: Prisma.BlogCreateInput) => {
     const result = await prisma.blog.update({
          where: {id},
          data: payload
     })
     return result
}

const deleteBlogById = async(id: number) => {
     const result = await prisma.blog.delete({
          where: {id}
     })
     return result
}

export const BlogService = {
     createBlog,
     getAllBlogs,
     getBlogById,
     updateBlogById,
     deleteBlogById
}
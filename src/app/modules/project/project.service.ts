import { Prisma, Project } from "@prisma/client";
import { prisma } from "../../config/db";


const createProject = async(payload: Prisma.ProjectCreateInput): Promise<Project> => {
     const result = await prisma.project.create({
          data: payload
     })

     return result;
}

const getAllProjects = async() => {
     const result = await prisma.project.findMany({
          orderBy: {
            createdAt: "desc"
        }
     });

     return result;
}

const getProjectById = async(id: number) => {
     const result = await prisma.$transaction(async (tx) => {
          await tx.project.update({
               where: {id},
               data: {
                    views: {
                         increment: 1
                    }
               }
          })

          return await tx.project.findUnique({
               where: {id}
          })
     })

     return result
}

const updateProjectById = async(id: number, payload: Prisma.ProjectCreateInput) => {
     const result = await prisma.project.update({
          where: {id},
          data: payload
     })
     return result
}

export const ProjectService = {
     createProject,
     getAllProjects,
     getProjectById,
     updateProjectById
}
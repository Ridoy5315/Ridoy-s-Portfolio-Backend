import httpStatus from "http-status-codes";
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { ProjectService } from "./project.service";
import { sendResponse } from "../../utils/sendResponse";
import AppError from "../../errorHelpers/AppError";

const createProject = catchAsync(async (req: Request, res: Response) => {
  const {
    projectName,
    description,
    projectLiveLink,
    githubClientSideLink,
    githubServerSideLink,
    mainTechnologyStackUsed,
    challengesFaced,
    improvementsAndPlans,
    author,
  } = req.body;

  const payload = {
    projectName,
    description,
    projectLiveLink,
    githubClientSideLink,
    githubServerSideLink,
    mainTechnologyStackUsed: JSON.parse(mainTechnologyStackUsed),
    challengesFaced: JSON.parse(challengesFaced),
    improvementsAndPlans: JSON.parse(improvementsAndPlans),
    author,
    thumbnail: req.file?.path ?? "",
  };

  const result = await ProjectService.createProject(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Project Created Successfully",
    data: result,
  });
});

const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.getAllProjects();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Projects Retrieved Successfully",
    data: result,
  });
});

const getProjectById = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.getProjectById(Number(req.params.id));

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, "Project not found");
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Project Retrieved Successfully",
    data: result,
  });
});

const updateProjectById = catchAsync(async (req: Request, res: Response) => {
  const {
    projectName,
    description,
    projectLiveLink,
    githubClientSideLink,
    githubServerSideLink,
    mainTechnologyStackUsed,
    challengesFaced,
    improvementsAndPlans,
    author,
  } = req.body;

  const payload: any = {};

  if (projectName !== undefined) payload.projectName = projectName;
  if (description !== undefined) payload.description = description;
  if (projectLiveLink !== undefined) payload.projectLiveLink = projectLiveLink;
  if (githubClientSideLink !== undefined)
    payload.githubClientSideLink = githubClientSideLink;
  if (githubServerSideLink !== undefined)
    payload.githubServerSideLink = githubServerSideLink;

  if (mainTechnologyStackUsed !== undefined)
    payload.mainTechnologyStackUsed = JSON.parse(mainTechnologyStackUsed);

  if (challengesFaced !== undefined)
    payload.challengesFaced = JSON.parse(challengesFaced);

  if (improvementsAndPlans !== undefined)
    payload.improvementsAndPlans = JSON.parse(improvementsAndPlans);

  if (author !== undefined) payload.author = author;

  if (req.file?.path) {
    payload.thumbnail = req.file.path;
  }

  const result = await ProjectService.updateProjectById(Number(req.params.id), payload);

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, "Project not found");
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Project updated Successfully",
    data: result,
  });
});

export const ProjectController = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
};

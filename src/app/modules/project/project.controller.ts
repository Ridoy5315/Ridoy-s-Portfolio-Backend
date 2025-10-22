import httpStatus from 'http-status-codes';
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { ProjectService } from "./project.service";
import { sendResponse } from "../../utils/sendResponse";

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
    author
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
    thumbnail: req.file?.path ?? '',
  };

  const result = await ProjectService.createProject(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Project Created Successfully",
    data: result,
  });
});

export const ProjectController = {
  createProject,
};

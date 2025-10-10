import httpStatus from 'http-status-codes';
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const loginWithEmailAndPassword = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AuthService.loginWithEmailAndPassword(res, req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Login Successfully",
      data: {
          accessToken : result.userTokens.accessToken,
          refreshToken : result.userTokens.refreshToken,
          user: result.user
      },
    });
  }
);

export const AuthController = {
     loginWithEmailAndPassword
} 

import httpStatus from 'http-status-codes';
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const loginWithEmailAndPassword = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AuthService.loginWithEmailAndPassword(res, req.body);

    console.log('from here', result)
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Login Successfully",
      data: result
    });
  }
);

export const AuthController = {
     loginWithEmailAndPassword
} 

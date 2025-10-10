import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
import { prisma } from "../../config/db";
import AppError from "../../errorHelpers/AppError";
import { createUserTokens } from "../../utils/userTokens";
import { setAuthCookies } from "../../utils/setCookies";
import { Response } from "express";

const loginWithEmailAndPassword = async (
  res: Response,
  {
    email,
    password,
  }: {
    email: string;
    password: string;
  }
) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    }
  });

  console.log(user);

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not found");
  }

  const isPasswordMatched = await bcryptjs.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new Error("Password is incorrect!");
  }

  const userTokens = await createUserTokens(user);

  setAuthCookies(res, userTokens);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: pass, ...rest } = user;

  return {
    user: rest,
    userTokens,
  };
};

export const AuthService = {
  loginWithEmailAndPassword,
};

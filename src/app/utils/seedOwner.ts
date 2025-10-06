import { Prisma } from "@prisma/client";
import { prisma } from "../config/db";
import { envVars } from "../config/env";
import bcryptjs from "bcryptjs";

export const seedOwner = async () => {
  try {
    
     const isOwnerExist = await prisma.user.findFirst({
          where: {
               email: envVars.OWNER_EMAIL
          }
     })

     if(isOwnerExist) {
          return;
     }

     const hashedPassword = await bcryptjs.hash(
      envVars.OWNER_PASSWORD,
      Number(envVars.BCRYPT_SALT_ROUND)
    );
     const payload: Prisma.UserCreateInput = {
      name: "Md Mahbubul Islam Ridoy",
      email: envVars.OWNER_EMAIL,
      password: hashedPassword,
    };
    
    const createOwner = await prisma.user.create({
     data: payload
    });

    return createOwner;
  } catch (error) {
     console.log(error)
  }
};

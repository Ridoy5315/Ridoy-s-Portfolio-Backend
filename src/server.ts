/* eslint-disable no-console */
import { Server } from "http";
import app from "./app";
import { envVars } from "./app/config/env";
import { prisma } from "./app/config/db";
import { seedOwner } from "./app/utils/seedOwner";

let server: Server;

async function connectToDB() {
     try{
          await prisma.$connect();
          console.log("DB Connection successfully")
     } catch(error) {
          console.log("DB connection failed", error)
          process.exit(1);
     }
}

const startServer = async () => {
  try {
     await connectToDB();
    server = app.listen(envVars.PORT, () => {
      console.log(`Server is listening to port ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
};

(async () => {
  await startServer();
  await seedOwner()
})();


process.on("SIGTERM", () => {
  console.log("SIGTERM signal detected... Server shutting down..");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("SIGINT signal detected... Server shutting down..");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection detected... Server shutting down..", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log("Uncaught exception detected... Server shutting down..", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

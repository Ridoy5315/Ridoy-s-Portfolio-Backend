-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "projectName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "projectLiveLink" TEXT NOT NULL,
    "githubClientSideLink" TEXT NOT NULL,
    "githubServerSideLink" TEXT NOT NULL,
    "mainTechnologyStackUsed" TEXT[],
    "challengesFaced" TEXT[],
    "improvementsAndPlans" TEXT[],
    "thumbnail" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

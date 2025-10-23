-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "projectName" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "projectLiveLink" DROP NOT NULL,
ALTER COLUMN "githubClientSideLink" DROP NOT NULL,
ALTER COLUMN "githubServerSideLink" DROP NOT NULL,
ALTER COLUMN "thumbnail" DROP NOT NULL;

-- AlterTable
ALTER TABLE "project_video_type" ADD COLUMN     "defaultCamInfoId" INTEGER;

-- AlterTable
ALTER TABLE "results" ALTER COLUMN "scalarResult" DROP NOT NULL;

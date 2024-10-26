/*
  Warnings:

  - You are about to drop the column `projectVideoTypeId` on the `cam_info` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "cam_info" DROP CONSTRAINT "cam_info_projectVideoTypeId_fkey";

-- AlterTable
ALTER TABLE "cam_info" DROP COLUMN "projectVideoTypeId";

-- AddForeignKey
ALTER TABLE "project_video_type" ADD CONSTRAINT "project_video_type_defaultCamInfoId_fkey" FOREIGN KEY ("defaultCamInfoId") REFERENCES "cam_info"("id") ON DELETE SET NULL ON UPDATE CASCADE;

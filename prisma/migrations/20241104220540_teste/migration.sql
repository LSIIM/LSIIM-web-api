/*
  Warnings:

  - You are about to drop the column `projectVideoTypeId` on the `annotation_video` table. All the data in the column will be lost.
  - You are about to drop the column `recordingId` on the `annotation_video` table. All the data in the column will be lost.
  - Added the required column `recordingVideoId` to the `annotation_video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `defaultCamId` to the `moves_info` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "annotation_video" DROP CONSTRAINT "annotation_video_projectVideoTypeId_fkey";

-- DropForeignKey
ALTER TABLE "annotation_video" DROP CONSTRAINT "annotation_video_recordingId_fkey";

-- AlterTable
ALTER TABLE "annotation_video" DROP COLUMN "projectVideoTypeId",
DROP COLUMN "recordingId",
ADD COLUMN     "recordingVideoId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "moves_info" ADD COLUMN     "defaultCamId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "moves_info" ADD CONSTRAINT "moves_info_defaultCamId_fkey" FOREIGN KEY ("defaultCamId") REFERENCES "cam_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annotation_video" ADD CONSTRAINT "annotation_video_recordingVideoId_fkey" FOREIGN KEY ("recordingVideoId") REFERENCES "RecordingVideo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

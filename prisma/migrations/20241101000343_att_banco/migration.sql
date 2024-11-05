/*
  Warnings:

  - You are about to drop the column `atipicidades` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `gestationalAge` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `isPremature` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `specialFeatureTemplate` on the `project_special_features` table. All the data in the column will be lost.
  - You are about to drop the `record_video_type_cam_used` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `camIdUsed` to the `RecordingVideo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specialFeature` to the `project_special_features` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patientSpecialFetauresTemplate` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "record_video_type_cam_used" DROP CONSTRAINT "record_video_type_cam_used_camIdUsed_fkey";

-- DropForeignKey
ALTER TABLE "record_video_type_cam_used" DROP CONSTRAINT "record_video_type_cam_used_projectVideoTypeId_fkey";

-- DropForeignKey
ALTER TABLE "record_video_type_cam_used" DROP CONSTRAINT "record_video_type_cam_used_recordingId_fkey";

-- AlterTable
ALTER TABLE "RecordingVideo" ADD COLUMN     "camIdUsed" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "patients" DROP COLUMN "atipicidades",
DROP COLUMN "gestationalAge",
DROP COLUMN "isPremature",
ADD COLUMN     "observation" TEXT;

-- AlterTable
ALTER TABLE "project_special_features" DROP COLUMN "specialFeatureTemplate",
ADD COLUMN     "specialFeature" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "patientSpecialFetauresTemplate" JSONB NOT NULL;

-- DropTable
DROP TABLE "record_video_type_cam_used";

-- AddForeignKey
ALTER TABLE "RecordingVideo" ADD CONSTRAINT "RecordingVideo_camIdUsed_fkey" FOREIGN KEY ("camIdUsed") REFERENCES "cam_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

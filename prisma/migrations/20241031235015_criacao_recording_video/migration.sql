/*
  Warnings:

  - You are about to drop the column `babyId` on the `recordings` table. All the data in the column will be lost.
  - Added the required column `patientId` to the `recordings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "recordings" DROP CONSTRAINT "recordings_babyId_fkey";

-- AlterTable
ALTER TABLE "recordings" DROP COLUMN "babyId",
ADD COLUMN     "patientId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "RecordingVideo" (
    "id" SERIAL NOT NULL,
    "projectVideoTypeId" INTEGER NOT NULL,
    "recordingId" INTEGER NOT NULL,

    CONSTRAINT "RecordingVideo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "recordings" ADD CONSTRAINT "recordings_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordingVideo" ADD CONSTRAINT "RecordingVideo_projectVideoTypeId_fkey" FOREIGN KEY ("projectVideoTypeId") REFERENCES "project_video_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordingVideo" ADD CONSTRAINT "RecordingVideo_recordingId_fkey" FOREIGN KEY ("recordingId") REFERENCES "recordings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

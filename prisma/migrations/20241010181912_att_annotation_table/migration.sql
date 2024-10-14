/*
  Warnings:

  - You are about to drop the column `videoTypeId` on the `Annotation` table. All the data in the column will be lost.
  - Added the required column `projectVideoTypeId` to the `Annotation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Annotation" DROP CONSTRAINT "Annotation_videoTypeId_fkey";

-- AlterTable
ALTER TABLE "Annotation" DROP COLUMN "videoTypeId",
ADD COLUMN     "projectVideoTypeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Annotation" ADD CONSTRAINT "Annotation_projectVideoTypeId_fkey" FOREIGN KEY ("projectVideoTypeId") REFERENCES "ProjectVideoType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `processing` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `processing_type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "processing" DROP CONSTRAINT "processing_processingTypeId_fkey";

-- DropForeignKey
ALTER TABLE "processing" DROP CONSTRAINT "processing_recordingId_fkey";

-- DropTable
DROP TABLE "processing";

-- DropTable
DROP TABLE "processing_type";

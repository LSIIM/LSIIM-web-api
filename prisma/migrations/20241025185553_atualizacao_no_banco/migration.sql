/*
  Warnings:

  - You are about to drop the `results` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "results" DROP CONSTRAINT "results_projectVideoTypeId_fkey";

-- DropForeignKey
ALTER TABLE "results" DROP CONSTRAINT "results_recordingId_fkey";

-- DropForeignKey
ALTER TABLE "results" DROP CONSTRAINT "results_resultTypeId_fkey";

-- DropForeignKey
ALTER TABLE "results" DROP CONSTRAINT "results_resultTypeOptionId_fkey";

-- DropTable
DROP TABLE "results";

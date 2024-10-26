/*
  Warnings:

  - You are about to drop the `baby_info` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `description` on table `result_type` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "recordings" DROP CONSTRAINT "recordings_babyId_fkey";

-- AlterTable
ALTER TABLE "result_type" ALTER COLUMN "description" SET NOT NULL;

-- DropTable
DROP TABLE "baby_info";

-- CreateTable
CREATE TABLE "patients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "isPremature" BOOLEAN NOT NULL,
    "gestationalAge" INTEGER NOT NULL,
    "atipicidade" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient_project_special_features" (
    "id" SERIAL NOT NULL,
    "specialFeatureTemplate" JSONB NOT NULL,
    "patientId" INTEGER NOT NULL,
    "projectSpecialFeatureId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patient_project_special_features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient_project" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patient_project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_special_features" (
    "id" SERIAL NOT NULL,
    "specialFeatureTemplate" JSONB NOT NULL,
    "projectId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_special_features_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "patient_project_special_features" ADD CONSTRAINT "patient_project_special_features_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_project_special_features" ADD CONSTRAINT "patient_project_special_features_projectSpecialFeatureId_fkey" FOREIGN KEY ("projectSpecialFeatureId") REFERENCES "project_special_features"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_project" ADD CONSTRAINT "patient_project_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_project" ADD CONSTRAINT "patient_project_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recordings" ADD CONSTRAINT "recordings_babyId_fkey" FOREIGN KEY ("babyId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_special_features" ADD CONSTRAINT "project_special_features_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

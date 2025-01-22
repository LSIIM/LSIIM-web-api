/*
  Warnings:

  - You are about to drop the column `specialFeatureTemplate` on the `patient_project_special_features` table. All the data in the column will be lost.
  - Added the required column `patientSpecialFeatures` to the `patient_project_special_features` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "patient_project_special_features" DROP COLUMN "specialFeatureTemplate",
ADD COLUMN     "patientSpecialFeatures" JSONB NOT NULL;

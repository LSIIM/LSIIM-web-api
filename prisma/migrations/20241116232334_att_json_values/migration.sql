-- AlterTable
ALTER TABLE "project_special_features" ALTER COLUMN "specialFeature" DROP NOT NULL;

-- AlterTable
ALTER TABLE "projects" ALTER COLUMN "patientSpecialFetauresTemplate" DROP NOT NULL;

-- DropForeignKey
ALTER TABLE "event_type_projects" DROP CONSTRAINT "event_type_projects_eventTypeId_fkey";

-- DropForeignKey
ALTER TABLE "patient_project_special_features" DROP CONSTRAINT "patient_project_special_features_projectId_fkey";

-- AlterTable
ALTER TABLE "event_type" ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "patients" ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "result_type" ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "result_type_options" ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE "patient_project_special_features" ADD CONSTRAINT "patient_project_special_features_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_type_projects" ADD CONSTRAINT "event_type_projects_eventTypeId_fkey" FOREIGN KEY ("eventTypeId") REFERENCES "event_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `projectVideoTypeId` on the `annotations` table. All the data in the column will be lost.
  - You are about to drop the column `recordingId` on the `annotations` table. All the data in the column will be lost.
  - You are about to drop the column `projectSpecialFeatureId` on the `patient_project_special_features` table. All the data in the column will be lost.
  - You are about to drop the column `atipicidade` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `defaultCamInfoId` on the `project_video_type` table. All the data in the column will be lost.
  - You are about to drop the column `camInfoId` on the `recordings` table. All the data in the column will be lost.
  - You are about to drop the column `movAux` on the `recordings` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `usuarios` table. All the data in the column will be lost.
  - Added the required column `annotationVideoId` to the `annotations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventTypeId` to the `annotations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `patient_project_special_features` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "annotations" DROP CONSTRAINT "annotations_annotationTypeId_fkey";

-- DropForeignKey
ALTER TABLE "annotations" DROP CONSTRAINT "annotations_projectVideoTypeId_fkey";

-- DropForeignKey
ALTER TABLE "annotations" DROP CONSTRAINT "annotations_recordingId_fkey";

-- DropForeignKey
ALTER TABLE "patient_project_special_features" DROP CONSTRAINT "patient_project_special_features_projectSpecialFeatureId_fkey";

-- DropForeignKey
ALTER TABLE "project_video_type" DROP CONSTRAINT "project_video_type_defaultCamInfoId_fkey";

-- DropForeignKey
ALTER TABLE "recordings" DROP CONSTRAINT "recordings_camInfoId_fkey";

-- AlterTable
ALTER TABLE "annotations" DROP COLUMN "projectVideoTypeId",
DROP COLUMN "recordingId",
ADD COLUMN     "annotationVideoId" INTEGER NOT NULL,
ADD COLUMN     "eventTypeId" INTEGER NOT NULL,
ADD COLUMN     "eventTypeProjectsId" INTEGER,
ALTER COLUMN "annotationTypeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "patient_project_special_features" DROP COLUMN "projectSpecialFeatureId",
ADD COLUMN     "projectId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "patients" DROP COLUMN "atipicidade",
ADD COLUMN     "atipicidades" TEXT;

-- AlterTable
ALTER TABLE "project_video_type" DROP COLUMN "defaultCamInfoId";

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "recordings" DROP COLUMN "camInfoId",
DROP COLUMN "movAux";

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "role",
ADD COLUMN     "isSysAdm" "Role" NOT NULL DEFAULT 'USER',
ALTER COLUMN "cpf" DROP NOT NULL;

-- CreateTable
CREATE TABLE "user_projects" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "isSysProj" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "annotation_results" (
    "id" SERIAL NOT NULL,
    "scalarResult" DOUBLE PRECISION,
    "resultTypeId" INTEGER NOT NULL,
    "resultTypeOptionId" INTEGER NOT NULL,
    "annotationVideoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "annotation_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "annotation_video" (
    "id" SERIAL NOT NULL,
    "recordingId" INTEGER NOT NULL,
    "projectVideoTypeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "annotation_video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isTemporal" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_type_projects" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "eventTypeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_type_projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "result_type_projects" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "resultTypeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "result_type_projects_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_projects" ADD CONSTRAINT "user_projects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_projects" ADD CONSTRAINT "user_projects_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_project_special_features" ADD CONSTRAINT "patient_project_special_features_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annotation_results" ADD CONSTRAINT "annotation_results_resultTypeId_fkey" FOREIGN KEY ("resultTypeId") REFERENCES "result_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annotation_results" ADD CONSTRAINT "annotation_results_resultTypeOptionId_fkey" FOREIGN KEY ("resultTypeOptionId") REFERENCES "result_type_options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annotation_results" ADD CONSTRAINT "annotation_results_annotationVideoId_fkey" FOREIGN KEY ("annotationVideoId") REFERENCES "annotation_video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annotation_video" ADD CONSTRAINT "annotation_video_recordingId_fkey" FOREIGN KEY ("recordingId") REFERENCES "recordings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annotation_video" ADD CONSTRAINT "annotation_video_projectVideoTypeId_fkey" FOREIGN KEY ("projectVideoTypeId") REFERENCES "project_video_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annotations" ADD CONSTRAINT "annotations_annotationVideoId_fkey" FOREIGN KEY ("annotationVideoId") REFERENCES "annotation_video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annotations" ADD CONSTRAINT "annotations_eventTypeId_fkey" FOREIGN KEY ("eventTypeId") REFERENCES "event_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annotations" ADD CONSTRAINT "annotations_annotationTypeId_fkey" FOREIGN KEY ("annotationTypeId") REFERENCES "annotation_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annotations" ADD CONSTRAINT "annotations_eventTypeProjectsId_fkey" FOREIGN KEY ("eventTypeProjectsId") REFERENCES "event_type_projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_type_projects" ADD CONSTRAINT "event_type_projects_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_type_projects" ADD CONSTRAINT "event_type_projects_eventTypeId_fkey" FOREIGN KEY ("eventTypeId") REFERENCES "event_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "result_type_projects" ADD CONSTRAINT "result_type_projects_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "result_type_projects" ADD CONSTRAINT "result_type_projects_resultTypeId_fkey" FOREIGN KEY ("resultTypeId") REFERENCES "result_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('ACCESS', 'REFRESH', 'RESET_PASSWORD', 'VERIFY_EMAIL');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "email" VARCHAR(256) NOT NULL,
    "password" VARCHAR(256) NOT NULL,
    "documento" VARCHAR(14) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_projects" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "type" "TokenType" NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "blacklisted" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "observation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient_project_special_features" (
    "id" SERIAL NOT NULL,
    "specialFeatureTemplate" JSONB NOT NULL,
    "patientId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
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
CREATE TABLE "cam_info" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "isInfraRed" BOOLEAN NOT NULL,
    "framerate" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cam_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "moves_info" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    "defaultCamId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "moves_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recordings" (
    "id" SERIAL NOT NULL,
    "ignore" BOOLEAN NOT NULL,
    "observation" TEXT,
    "patientId" INTEGER NOT NULL,
    "recordingDate" TIMESTAMP(3) NOT NULL,
    "moveId" INTEGER,
    "projectId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recordings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecordingVideo" (
    "id" SERIAL NOT NULL,
    "projectVideoTypeId" INTEGER NOT NULL,
    "recordingId" INTEGER NOT NULL,
    "camIdUsed" INTEGER NOT NULL,
    "file" TEXT,

    CONSTRAINT "RecordingVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "projectName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "patientSpecialFetauresTemplate" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_special_features" (
    "id" SERIAL NOT NULL,
    "specialFeature" JSONB NOT NULL,
    "projectId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_special_features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_video_type" (
    "id" SERIAL NOT NULL,
    "isMain" BOOLEAN NOT NULL,
    "typeName" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_video_type_pkey" PRIMARY KEY ("id")
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
    "comment" TEXT,
    "recordingVideoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "annotation_video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "annotations" (
    "id" SERIAL NOT NULL,
    "annotationVideoId" INTEGER NOT NULL,
    "eventTypeId" INTEGER NOT NULL,
    "frames" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "eventTypeProjectsId" INTEGER,

    CONSTRAINT "annotations_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "result_type_options" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "resultTypeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "result_type_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "result_type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "result_type_pkey" PRIMARY KEY ("id")
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

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "user_projects" ADD CONSTRAINT "user_projects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_projects" ADD CONSTRAINT "user_projects_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_project_special_features" ADD CONSTRAINT "patient_project_special_features_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_project_special_features" ADD CONSTRAINT "patient_project_special_features_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_project" ADD CONSTRAINT "patient_project_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_project" ADD CONSTRAINT "patient_project_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moves_info" ADD CONSTRAINT "moves_info_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moves_info" ADD CONSTRAINT "moves_info_defaultCamId_fkey" FOREIGN KEY ("defaultCamId") REFERENCES "cam_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recordings" ADD CONSTRAINT "recordings_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recordings" ADD CONSTRAINT "recordings_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "moves_info"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recordings" ADD CONSTRAINT "recordings_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordingVideo" ADD CONSTRAINT "RecordingVideo_projectVideoTypeId_fkey" FOREIGN KEY ("projectVideoTypeId") REFERENCES "project_video_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordingVideo" ADD CONSTRAINT "RecordingVideo_recordingId_fkey" FOREIGN KEY ("recordingId") REFERENCES "recordings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordingVideo" ADD CONSTRAINT "RecordingVideo_camIdUsed_fkey" FOREIGN KEY ("camIdUsed") REFERENCES "cam_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_special_features" ADD CONSTRAINT "project_special_features_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_video_type" ADD CONSTRAINT "project_video_type_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annotation_results" ADD CONSTRAINT "annotation_results_resultTypeId_fkey" FOREIGN KEY ("resultTypeId") REFERENCES "result_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annotation_results" ADD CONSTRAINT "annotation_results_resultTypeOptionId_fkey" FOREIGN KEY ("resultTypeOptionId") REFERENCES "result_type_options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annotation_results" ADD CONSTRAINT "annotation_results_annotationVideoId_fkey" FOREIGN KEY ("annotationVideoId") REFERENCES "annotation_video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annotation_video" ADD CONSTRAINT "annotation_video_recordingVideoId_fkey" FOREIGN KEY ("recordingVideoId") REFERENCES "RecordingVideo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annotations" ADD CONSTRAINT "annotations_annotationVideoId_fkey" FOREIGN KEY ("annotationVideoId") REFERENCES "annotation_video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annotations" ADD CONSTRAINT "annotations_eventTypeId_fkey" FOREIGN KEY ("eventTypeId") REFERENCES "event_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annotations" ADD CONSTRAINT "annotations_eventTypeProjectsId_fkey" FOREIGN KEY ("eventTypeProjectsId") REFERENCES "event_type_projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_type_projects" ADD CONSTRAINT "event_type_projects_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_type_projects" ADD CONSTRAINT "event_type_projects_eventTypeId_fkey" FOREIGN KEY ("eventTypeId") REFERENCES "event_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "result_type_options" ADD CONSTRAINT "result_type_options_resultTypeId_fkey" FOREIGN KEY ("resultTypeId") REFERENCES "result_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "result_type_projects" ADD CONSTRAINT "result_type_projects_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "result_type_projects" ADD CONSTRAINT "result_type_projects_resultTypeId_fkey" FOREIGN KEY ("resultTypeId") REFERENCES "result_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

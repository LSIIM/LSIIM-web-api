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
    "cpf" VARCHAR(14) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "baby_info" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "isPremature" BOOLEAN NOT NULL,
    "gestationalAge" INTEGER NOT NULL,
    "atipicidade" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "baby_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cam_info" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "isInfraRed" BOOLEAN NOT NULL,
    "framerate" DOUBLE PRECISION,
    "projectVideoTypeId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cam_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "moves_info" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "moves_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recordings" (
    "id" SERIAL NOT NULL,
    "ignore" BOOLEAN NOT NULL,
    "observation" TEXT,
    "babyId" INTEGER NOT NULL,
    "recordingDate" TIMESTAMP(3) NOT NULL,
    "moveId" INTEGER,
    "movAux" BOOLEAN NOT NULL,
    "projectId" INTEGER NOT NULL,
    "camInfoId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recordings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "projectName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "record_video_type_cam_used" (
    "id" SERIAL NOT NULL,
    "camIdUsed" INTEGER NOT NULL,
    "recordingId" INTEGER NOT NULL,
    "projectVideoTypeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "record_video_type_cam_used_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "annotation_type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "isTemporal" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "annotation_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "annotations" (
    "id" SERIAL NOT NULL,
    "recordingId" INTEGER NOT NULL,
    "projectVideoTypeId" INTEGER NOT NULL,
    "annotationTypeId" INTEGER NOT NULL,
    "frames" INTEGER[],
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "annotations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "processing_type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "processing_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "processing" (
    "id" SERIAL NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "processingTypeId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "recordingId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "resultUrl" TEXT,

    CONSTRAINT "processing_pkey" PRIMARY KEY ("id")
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
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "result_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "results" (
    "id" SERIAL NOT NULL,
    "scalarResult" DOUBLE PRECISION NOT NULL,
    "resultTypeId" INTEGER NOT NULL,
    "resultTypeOptionId" INTEGER NOT NULL,
    "projectVideoTypeId" INTEGER NOT NULL,
    "recordingId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "results_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cam_info" ADD CONSTRAINT "cam_info_projectVideoTypeId_fkey" FOREIGN KEY ("projectVideoTypeId") REFERENCES "project_video_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moves_info" ADD CONSTRAINT "moves_info_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recordings" ADD CONSTRAINT "recordings_babyId_fkey" FOREIGN KEY ("babyId") REFERENCES "baby_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recordings" ADD CONSTRAINT "recordings_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "moves_info"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recordings" ADD CONSTRAINT "recordings_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recordings" ADD CONSTRAINT "recordings_camInfoId_fkey" FOREIGN KEY ("camInfoId") REFERENCES "cam_info"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_video_type" ADD CONSTRAINT "project_video_type_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "record_video_type_cam_used" ADD CONSTRAINT "record_video_type_cam_used_camIdUsed_fkey" FOREIGN KEY ("camIdUsed") REFERENCES "cam_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "record_video_type_cam_used" ADD CONSTRAINT "record_video_type_cam_used_recordingId_fkey" FOREIGN KEY ("recordingId") REFERENCES "recordings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "record_video_type_cam_used" ADD CONSTRAINT "record_video_type_cam_used_projectVideoTypeId_fkey" FOREIGN KEY ("projectVideoTypeId") REFERENCES "project_video_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annotations" ADD CONSTRAINT "annotations_recordingId_fkey" FOREIGN KEY ("recordingId") REFERENCES "recordings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annotations" ADD CONSTRAINT "annotations_projectVideoTypeId_fkey" FOREIGN KEY ("projectVideoTypeId") REFERENCES "project_video_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annotations" ADD CONSTRAINT "annotations_annotationTypeId_fkey" FOREIGN KEY ("annotationTypeId") REFERENCES "annotation_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processing" ADD CONSTRAINT "processing_processingTypeId_fkey" FOREIGN KEY ("processingTypeId") REFERENCES "processing_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processing" ADD CONSTRAINT "processing_recordingId_fkey" FOREIGN KEY ("recordingId") REFERENCES "recordings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "result_type_options" ADD CONSTRAINT "result_type_options_resultTypeId_fkey" FOREIGN KEY ("resultTypeId") REFERENCES "result_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_resultTypeId_fkey" FOREIGN KEY ("resultTypeId") REFERENCES "result_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_resultTypeOptionId_fkey" FOREIGN KEY ("resultTypeOptionId") REFERENCES "result_type_options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_projectVideoTypeId_fkey" FOREIGN KEY ("projectVideoTypeId") REFERENCES "project_video_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_recordingId_fkey" FOREIGN KEY ("recordingId") REFERENCES "recordings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

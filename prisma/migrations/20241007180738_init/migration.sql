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
CREATE TABLE "BabyInfo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "isPremature" BOOLEAN NOT NULL,
    "gestationalAge" INTEGER NOT NULL,
    "atipicidade" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BabyInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CamInfo" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "isInfraRed" BOOLEAN NOT NULL,
    "framerate" DOUBLE PRECISION,
    "projectVideoTypeId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CamInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovesInfo" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MovesInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recording" (
    "id" SERIAL NOT NULL,
    "ignore" BOOLEAN NOT NULL,
    "observation" TEXT,
    "babyId" INTEGER NOT NULL,
    "recordingDate" TIMESTAMP(3) NOT NULL,
    "moveId" INTEGER,
    "movAux" BOOLEAN NOT NULL,
    "projectId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recording_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "projectName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectVideoType" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "isMain" BOOLEAN NOT NULL,
    "typeName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectVideoType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecordVideoTypeCamUsed" (
    "id" SERIAL NOT NULL,
    "camIdUsed" INTEGER NOT NULL,
    "recordingId" INTEGER NOT NULL,
    "projectVideoTypeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecordVideoTypeCamUsed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnnotationType" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnnotationType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Annotation" (
    "id" SERIAL NOT NULL,
    "recordingId" INTEGER NOT NULL,
    "videoTypeId" INTEGER NOT NULL,
    "annotationTypeId" INTEGER NOT NULL,
    "frames" INTEGER[],
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Annotation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcessingType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProcessingType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Processing" (
    "id" SERIAL NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "processingTypeId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "recordingId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "resultUrl" TEXT,

    CONSTRAINT "Processing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CamInfo" ADD CONSTRAINT "CamInfo_projectVideoTypeId_fkey" FOREIGN KEY ("projectVideoTypeId") REFERENCES "ProjectVideoType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovesInfo" ADD CONSTRAINT "MovesInfo_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recording" ADD CONSTRAINT "Recording_babyId_fkey" FOREIGN KEY ("babyId") REFERENCES "BabyInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recording" ADD CONSTRAINT "Recording_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "MovesInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recording" ADD CONSTRAINT "Recording_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectVideoType" ADD CONSTRAINT "ProjectVideoType_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordVideoTypeCamUsed" ADD CONSTRAINT "RecordVideoTypeCamUsed_camIdUsed_fkey" FOREIGN KEY ("camIdUsed") REFERENCES "CamInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordVideoTypeCamUsed" ADD CONSTRAINT "RecordVideoTypeCamUsed_recordingId_fkey" FOREIGN KEY ("recordingId") REFERENCES "Recording"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordVideoTypeCamUsed" ADD CONSTRAINT "RecordVideoTypeCamUsed_projectVideoTypeId_fkey" FOREIGN KEY ("projectVideoTypeId") REFERENCES "ProjectVideoType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Annotation" ADD CONSTRAINT "Annotation_recordingId_fkey" FOREIGN KEY ("recordingId") REFERENCES "Recording"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Annotation" ADD CONSTRAINT "Annotation_videoTypeId_fkey" FOREIGN KEY ("videoTypeId") REFERENCES "RecordVideoTypeCamUsed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Annotation" ADD CONSTRAINT "Annotation_annotationTypeId_fkey" FOREIGN KEY ("annotationTypeId") REFERENCES "AnnotationType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Processing" ADD CONSTRAINT "Processing_processingTypeId_fkey" FOREIGN KEY ("processingTypeId") REFERENCES "ProcessingType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Processing" ADD CONSTRAINT "Processing_recordingId_fkey" FOREIGN KEY ("recordingId") REFERENCES "Recording"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

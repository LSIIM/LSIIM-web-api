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
    "framerate" DOUBLE PRECISION NOT NULL,
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
    "recordingYear" INTEGER NOT NULL,
    "recordingMonth" INTEGER NOT NULL,
    "recordingDay" INTEGER NOT NULL,
    "moveId" INTEGER NOT NULL,
    "movAux" BOOLEAN NOT NULL,
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
    "projectVideoTypeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecordVideoTypeCamUsed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnnotationType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "jsonModel" TEXT,
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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "frames" JSONB NOT NULL,
    "comment" TEXT,

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
CREATE UNIQUE INDEX "ProjectVideoType_typeName_key" ON "ProjectVideoType"("typeName");

-- AddForeignKey
ALTER TABLE "MovesInfo" ADD CONSTRAINT "MovesInfo_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recording" ADD CONSTRAINT "Recording_babyId_fkey" FOREIGN KEY ("babyId") REFERENCES "BabyInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recording" ADD CONSTRAINT "Recording_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "MovesInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectVideoType" ADD CONSTRAINT "ProjectVideoType_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordVideoTypeCamUsed" ADD CONSTRAINT "RecordVideoTypeCamUsed_camIdUsed_fkey" FOREIGN KEY ("camIdUsed") REFERENCES "CamInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordVideoTypeCamUsed" ADD CONSTRAINT "RecordVideoTypeCamUsed_recordingId_fkey" FOREIGN KEY ("recordingId") REFERENCES "Recording"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordVideoTypeCamUsed" ADD CONSTRAINT "RecordVideoTypeCamUsed_projectVideoTypeId_fkey" FOREIGN KEY ("projectVideoTypeId") REFERENCES "ProjectVideoType"("typeName") ON DELETE RESTRICT ON UPDATE CASCADE;

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

/*
  Warnings:

  - You are about to drop the `Video` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `isTemporal` to the `AnnotationType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AnnotationType" ADD COLUMN     "isTemporal" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "Video";

-- CreateTable
CREATE TABLE "ResultTypeOptions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "resultTypeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResultTypeOptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResultType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResultType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Result" (
    "id" SERIAL NOT NULL,
    "scalarResult" DOUBLE PRECISION NOT NULL,
    "resultTypeId" INTEGER NOT NULL,
    "resultTypeOptionId" INTEGER NOT NULL,
    "projectVideoTypeId" INTEGER NOT NULL,
    "recordingId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ResultTypeOptions" ADD CONSTRAINT "ResultTypeOptions_resultTypeId_fkey" FOREIGN KEY ("resultTypeId") REFERENCES "ResultType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_resultTypeId_fkey" FOREIGN KEY ("resultTypeId") REFERENCES "ResultType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_resultTypeOptionId_fkey" FOREIGN KEY ("resultTypeOptionId") REFERENCES "ResultTypeOptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_projectVideoTypeId_fkey" FOREIGN KEY ("projectVideoTypeId") REFERENCES "ProjectVideoType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_recordingId_fkey" FOREIGN KEY ("recordingId") REFERENCES "Recording"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

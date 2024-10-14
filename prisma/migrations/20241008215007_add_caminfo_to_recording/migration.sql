-- AlterTable
ALTER TABLE "Recording" ADD COLUMN     "camInfoId" INTEGER;

-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "isMain" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recording" ADD CONSTRAINT "Recording_camInfoId_fkey" FOREIGN KEY ("camInfoId") REFERENCES "CamInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

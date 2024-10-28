/*
  Warnings:

  - You are about to drop the column `annotationTypeId` on the `annotations` table. All the data in the column will be lost.
  - You are about to drop the column `isSysProj` on the `user_projects` table. All the data in the column will be lost.
  - You are about to drop the column `isSysAdm` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the `annotation_type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `results` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `user_projects` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "annotations" DROP CONSTRAINT "annotations_annotationTypeId_fkey";

-- DropForeignKey
ALTER TABLE "results" DROP CONSTRAINT "results_projectVideoTypeId_fkey";

-- DropForeignKey
ALTER TABLE "results" DROP CONSTRAINT "results_recordingId_fkey";

-- DropForeignKey
ALTER TABLE "results" DROP CONSTRAINT "results_resultTypeId_fkey";

-- DropForeignKey
ALTER TABLE "results" DROP CONSTRAINT "results_resultTypeOptionId_fkey";

-- AlterTable
ALTER TABLE "annotations" DROP COLUMN "annotationTypeId";

-- AlterTable
ALTER TABLE "user_projects" DROP COLUMN "isSysProj",
ADD COLUMN     "role" "Role" NOT NULL;

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "isSysAdm",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "annotation_type";

-- DropTable
DROP TABLE "results";

/*
  Warnings:

  - You are about to drop the column `comment` on the `annotations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "annotation_video" ADD COLUMN     "comment" TEXT;

-- AlterTable
ALTER TABLE "annotations" DROP COLUMN "comment";

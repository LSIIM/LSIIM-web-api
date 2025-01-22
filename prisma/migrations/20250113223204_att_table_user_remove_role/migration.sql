/*
  Warnings:

  - You are about to drop the column `role` on the `usuarios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_projects" ADD COLUMN     "isProjectAdmin" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "role",
ADD COLUMN     "isSysAdmin" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "Role";

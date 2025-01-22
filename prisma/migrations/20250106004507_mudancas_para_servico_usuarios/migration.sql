/*
  Warnings:

  - The values [ADMIN] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('SYS_ADMIN', 'PROJECT_ADMIN', 'USER');
ALTER TABLE "usuarios" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "usuarios" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TABLE "user_projects" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "usuarios" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- DropForeignKey
ALTER TABLE "user_projects" DROP CONSTRAINT "user_projects_projectId_fkey";

-- DropForeignKey
ALTER TABLE "user_projects" DROP CONSTRAINT "user_projects_userId_fkey";

-- AddForeignKey
ALTER TABLE "user_projects" ADD CONSTRAINT "user_projects_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_projects" ADD CONSTRAINT "user_projects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

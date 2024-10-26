/*
  Warnings:

  - You are about to drop the column `name` on the `annotation_type` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `event_type` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `event_type` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `result_type` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `result_type` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `result_type_options` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `result_type_options` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `usuarios` table. All the data in the column will be lost.
  - Added the required column `nome` to the `annotation_type` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `event_type` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `event_type` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `result_type` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `result_type` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `result_type_options` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `result_type_options` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "annotation_type" DROP COLUMN "name",
ADD COLUMN     "nome" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "event_type" DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "descricao" TEXT NOT NULL,
ADD COLUMN     "nome" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "patients" DROP COLUMN "name",
ADD COLUMN     "nome" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "result_type" DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "descricao" TEXT NOT NULL,
ADD COLUMN     "nome" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "result_type_options" DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "descricao" TEXT NOT NULL,
ADD COLUMN     "nome" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "name",
ADD COLUMN     "nome" VARCHAR(256) NOT NULL;

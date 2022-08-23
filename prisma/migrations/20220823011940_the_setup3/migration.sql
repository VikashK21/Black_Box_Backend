/*
  Warnings:

  - You are about to drop the column `Content` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `Methodology` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `Structure` on the `Course` table. All the data in the column will be lost.
  - Added the required column `duration_type` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "Content",
DROP COLUMN "Methodology",
DROP COLUMN "Structure",
ADD COLUMN     "content" JSONB,
ADD COLUMN     "duration_type" TEXT NOT NULL,
ADD COLUMN     "methodology" JSONB,
ADD COLUMN     "requirements" JSONB,
ADD COLUMN     "structure" JSONB;

/*
  Warnings:

  - You are about to drop the `Content` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Methodology` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Structure` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_course_id_fkey";

-- DropForeignKey
ALTER TABLE "Methodology" DROP CONSTRAINT "Methodology_course_id_fkey";

-- DropForeignKey
ALTER TABLE "Structure" DROP CONSTRAINT "Structure_course_id_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "Content" JSONB,
ADD COLUMN     "Methodology" JSONB,
ADD COLUMN     "Structure" JSONB;

-- DropTable
DROP TABLE "Content";

-- DropTable
DROP TABLE "Methodology";

-- DropTable
DROP TABLE "Structure";

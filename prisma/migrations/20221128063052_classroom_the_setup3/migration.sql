/*
  Warnings:

  - You are about to drop the column `duration_type` on the `Classroom_Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Classroom" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Classroom_Course" DROP COLUMN "duration_type";

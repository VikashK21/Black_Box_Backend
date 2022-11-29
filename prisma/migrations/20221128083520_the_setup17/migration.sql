/*
  Warnings:

  - You are about to drop the column `class_structure` on the `Classroom_Course` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Classroom_Course` table. All the data in the column will be lost.
  - You are about to drop the column `methodology` on the `Classroom_Course` table. All the data in the column will be lost.
  - You are about to drop the column `structure` on the `Classroom_Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Classroom_Course" DROP COLUMN "class_structure",
DROP COLUMN "content",
DROP COLUMN "methodology",
DROP COLUMN "structure";

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

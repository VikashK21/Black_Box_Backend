/*
  Warnings:

  - Added the required column `class_structure` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "class_structure" TEXT NOT NULL,
ALTER COLUMN "fee" DROP NOT NULL;

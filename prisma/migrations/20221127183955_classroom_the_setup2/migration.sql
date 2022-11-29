/*
  Warnings:

  - Added the required column `title` to the `Classroom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Classroom" ADD COLUMN     "title" TEXT NOT NULL;

/*
  Warnings:

  - You are about to drop the column `link` on the `Classes` table. All the data in the column will be lost.
  - You are about to drop the column `video` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Classes" DROP COLUMN "link";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "video",
ADD COLUMN     "link" TEXT;

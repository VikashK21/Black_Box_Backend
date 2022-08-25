/*
  Warnings:

  - You are about to drop the column `imgages` on the `Course` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Classes_course_id_key";

-- DropIndex
DROP INDEX "Course_host_key";

-- DropIndex
DROP INDEX "Gift_course_id_key";

-- DropIndex
DROP INDEX "Participants_participant_id_key";

-- DropIndex
DROP INDEX "Suggest_course_id_key";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "imgages",
ADD COLUMN     "images" TEXT[];

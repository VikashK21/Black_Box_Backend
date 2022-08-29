/*
  Warnings:

  - Added the required column `approved_parti_id` to the `Suggest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Classes" ADD COLUMN     "ongoingCourse" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "completion" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Suggest" ADD COLUMN     "approved_parti_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Suggest" ADD CONSTRAINT "Suggest_approved_parti_id_fkey" FOREIGN KEY ("approved_parti_id") REFERENCES "Participants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

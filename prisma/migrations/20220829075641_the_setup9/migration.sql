/*
  Warnings:

  - You are about to drop the column `ongoingCourse` on the `Classes` table. All the data in the column will be lost.
  - Added the required column `participant_id` to the `Gift` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Classes" DROP COLUMN "ongoingCourse",
ADD COLUMN     "over" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Gift" ADD COLUMN     "participant_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Gift" ADD CONSTRAINT "Gift_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "Participants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

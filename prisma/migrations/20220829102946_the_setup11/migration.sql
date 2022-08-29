/*
  Warnings:

  - You are about to drop the column `participant_id` on the `Gift` table. All the data in the column will be lost.
  - You are about to drop the column `approved_parti_id` on the `Suggest` table. All the data in the column will be lost.
  - Added the required column `gifted_by` to the `Gift` table without a default value. This is not possible if the table is not empty.
  - Added the required column `suggested_by` to the `Suggest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Gift" DROP CONSTRAINT "Gift_participant_id_fkey";

-- DropForeignKey
ALTER TABLE "Suggest" DROP CONSTRAINT "Suggest_approved_parti_id_fkey";

-- AlterTable
ALTER TABLE "Gift" DROP COLUMN "participant_id",
ADD COLUMN     "gifted_by" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Suggest" DROP COLUMN "approved_parti_id",
ADD COLUMN     "suggested_by" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Gift" ADD CONSTRAINT "Gift_id_fkey" FOREIGN KEY ("id") REFERENCES "Participants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suggest" ADD CONSTRAINT "Suggest_id_fkey" FOREIGN KEY ("id") REFERENCES "Participants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

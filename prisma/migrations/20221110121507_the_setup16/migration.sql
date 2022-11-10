/*
  Warnings:

  - A unique constraint covering the columns `[participant_id]` on the table `Gift` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[participant_id]` on the table `Suggest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `participant_id` to the `Gift` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Gift" DROP CONSTRAINT "Gift_id_fkey";

-- DropForeignKey
ALTER TABLE "Suggest" DROP CONSTRAINT "Suggest_id_fkey";

-- AlterTable
ALTER TABLE "Gift" ADD COLUMN     "participant_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Suggest" ADD COLUMN     "participant_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Gift_participant_id_key" ON "Gift"("participant_id");

-- CreateIndex
CREATE UNIQUE INDEX "Suggest_participant_id_key" ON "Suggest"("participant_id");

-- AddForeignKey
ALTER TABLE "Gift" ADD CONSTRAINT "Gift_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "Participants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suggest" ADD CONSTRAINT "Suggest_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "Participants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

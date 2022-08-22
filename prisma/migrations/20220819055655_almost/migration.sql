/*
  Warnings:

  - You are about to drop the column `participants` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the `Program` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Program" DROP CONSTRAINT "Program_host_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "participants";

-- DropTable
DROP TABLE "Program";

-- CreateTable
CREATE TABLE "Participants" (
    "id" SERIAL NOT NULL,
    "course_id" INTEGER NOT NULL,
    "participant_id" INTEGER NOT NULL,

    CONSTRAINT "Participants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gift" (
    "id" SERIAL NOT NULL,
    "email_id" TEXT NOT NULL,
    "course_id" INTEGER NOT NULL,

    CONSTRAINT "Gift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Suggest" (
    "id" SERIAL NOT NULL,
    "email_id" TEXT NOT NULL,
    "course_id" INTEGER NOT NULL,

    CONSTRAINT "Suggest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Participants_participant_id_key" ON "Participants"("participant_id");

-- CreateIndex
CREATE UNIQUE INDEX "Gift_email_id_key" ON "Gift"("email_id");

-- CreateIndex
CREATE UNIQUE INDEX "Gift_course_id_key" ON "Gift"("course_id");

-- CreateIndex
CREATE UNIQUE INDEX "Suggest_email_id_key" ON "Suggest"("email_id");

-- CreateIndex
CREATE UNIQUE INDEX "Suggest_course_id_key" ON "Suggest"("course_id");

-- AddForeignKey
ALTER TABLE "Participants" ADD CONSTRAINT "Participants_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participants" ADD CONSTRAINT "Participants_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gift" ADD CONSTRAINT "Gift_email_id_fkey" FOREIGN KEY ("email_id") REFERENCES "Users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gift" ADD CONSTRAINT "Gift_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suggest" ADD CONSTRAINT "Suggest_email_id_fkey" FOREIGN KEY ("email_id") REFERENCES "Users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suggest" ADD CONSTRAINT "Suggest_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

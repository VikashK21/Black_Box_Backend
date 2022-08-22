/*
  Warnings:

  - You are about to drop the `Classes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Classes" DROP CONSTRAINT "Classes_user_id_fkey";

-- DropTable
DROP TABLE "Classes";

-- CreateTable
CREATE TABLE "Program" (
    "id" SERIAL NOT NULL,
    "host" INTEGER NOT NULL,
    "participants" JSONB,
    "classes" JSONB,
    "gifted" JSONB,
    "suggested" JSONB,
    "title" TEXT NOT NULL,
    "duration_type" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "timings" TEXT NOT NULL,
    "course_structure" JSONB NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "fee" JSONB NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Program_host_key" ON "Program"("host");

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_host_fkey" FOREIGN KEY ("host") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

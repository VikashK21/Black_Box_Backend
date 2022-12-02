-- AlterTable
ALTER TABLE "Classroom_Course" ADD COLUMN     "creator" INTEGER;

-- AddForeignKey
ALTER TABLE "Classroom_Course" ADD CONSTRAINT "Classroom_Course_creator_fkey" FOREIGN KEY ("creator") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

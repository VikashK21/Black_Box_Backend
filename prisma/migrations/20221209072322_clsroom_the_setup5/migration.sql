-- DropIndex
DROP INDEX "Users_phone_num_key";

-- AlterTable
ALTER TABLE "Classroom" ADD COLUMN     "host" INTEGER;

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "duration_type" DROP NOT NULL,
ALTER COLUMN "class_structure" DROP NOT NULL;

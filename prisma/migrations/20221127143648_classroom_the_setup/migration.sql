-- DropForeignKey
ALTER TABLE "Classes" DROP CONSTRAINT "Classes_course_id_fkey";

-- DropForeignKey
ALTER TABLE "Reactions" DROP CONSTRAINT "Reactions_course_id_fkey";

-- DropForeignKey
ALTER TABLE "Vid_Classes" DROP CONSTRAINT "Vid_Classes_course_id_fkey";

-- AlterTable
ALTER TABLE "Classes" ADD COLUMN     "classroom_course_id" INTEGER,
ALTER COLUMN "course_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Reactions" ADD COLUMN     "classroom_course_id" INTEGER,
ALTER COLUMN "course_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "classroom_id" INTEGER;

-- AlterTable
ALTER TABLE "Vid_Classes" ADD COLUMN     "classroom_course_id" INTEGER,
ALTER COLUMN "course_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Classroom" (
    "id" SERIAL NOT NULL,
    "email_type" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classroom_Course" (
    "id" SERIAL NOT NULL,
    "completion" BOOLEAN NOT NULL DEFAULT false,
    "title" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT NOT NULL,
    "host" INTEGER NOT NULL,
    "images" TEXT[],
    "hosted" BOOLEAN NOT NULL DEFAULT false,
    "duration_type" TEXT NOT NULL,
    "link" TEXT,
    "class_structure" TEXT NOT NULL,
    "structure" JSONB,
    "methodology" JSONB,
    "content" JSONB,
    "requirements" JSONB,

    CONSTRAINT "Classroom_Course_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Classroom_email_type_key" ON "Classroom"("email_type");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "Classroom"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classroom_Course" ADD CONSTRAINT "Classroom_Course_host_fkey" FOREIGN KEY ("host") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classes" ADD CONSTRAINT "Classes_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classes" ADD CONSTRAINT "Classes_classroom_course_id_fkey" FOREIGN KEY ("classroom_course_id") REFERENCES "Classroom_Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vid_Classes" ADD CONSTRAINT "Vid_Classes_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vid_Classes" ADD CONSTRAINT "Vid_Classes_classroom_course_id_fkey" FOREIGN KEY ("classroom_course_id") REFERENCES "Classroom_Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reactions" ADD CONSTRAINT "Reactions_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reactions" ADD CONSTRAINT "Reactions_classroom_course_id_fkey" FOREIGN KEY ("classroom_course_id") REFERENCES "Classroom_Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "Reactions" (
    "id" SERIAL NOT NULL,
    "course_id" INTEGER NOT NULL,
    "reactor_id" INTEGER NOT NULL,
    "heartful" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Reactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reactions" ADD CONSTRAINT "Reactions_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reactions" ADD CONSTRAINT "Reactions_reactor_id_fkey" FOREIGN KEY ("reactor_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

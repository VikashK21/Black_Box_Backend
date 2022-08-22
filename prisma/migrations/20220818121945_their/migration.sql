-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "fee" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "participants" JSONB NOT NULL,
    "host" INTEGER NOT NULL,
    "max_paticipants" INTEGER NOT NULL,
    "imgages" TEXT[],
    "video" TEXT,
    "hosted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "course_id" INTEGER NOT NULL,
    "fee" TEXT,

    CONSTRAINT "Classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Structure" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "course_id" INTEGER NOT NULL,

    CONSTRAINT "Structure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vid_Classes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "course_id" INTEGER NOT NULL,

    CONSTRAINT "Vid_Classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Methodology" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "course_id" INTEGER NOT NULL,

    CONSTRAINT "Methodology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "course_id" INTEGER NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_host_key" ON "Course"("host");

-- CreateIndex
CREATE UNIQUE INDEX "Classes_course_id_key" ON "Classes"("course_id");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_host_fkey" FOREIGN KEY ("host") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classes" ADD CONSTRAINT "Classes_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Structure" ADD CONSTRAINT "Structure_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vid_Classes" ADD CONSTRAINT "Vid_Classes_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Methodology" ADD CONSTRAINT "Methodology_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

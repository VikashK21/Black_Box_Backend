-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'email/phone',
    "img_thumbnail" TEXT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_num" TEXT,
    "password" TEXT NOT NULL,
    "about" TEXT,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "fee" TEXT NOT NULL,
    "description" TEXT NOT NULL,
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
    "title" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "link" TEXT,
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
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_phone_num_key" ON "Users"("phone_num");

-- CreateIndex
CREATE UNIQUE INDEX "Course_host_key" ON "Course"("host");

-- CreateIndex
CREATE UNIQUE INDEX "Classes_course_id_key" ON "Classes"("course_id");

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

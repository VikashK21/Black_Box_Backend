-- CreateTable
CREATE TABLE "Friends" (
    "id" SERIAL NOT NULL,
    "friend_id" INTEGER NOT NULL,
    "my_id" INTEGER NOT NULL,

    CONSTRAINT "Friends_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_friend_id_fkey" FOREIGN KEY ("friend_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

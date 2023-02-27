-- CreateTable
CREATE TABLE "Friends_Peer" (
    "id" SERIAL NOT NULL,
    "my_id" INTEGER NOT NULL,

    CONSTRAINT "Friends_Peer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Friends_Peer" ADD CONSTRAINT "Friends_Peer_my_id_fkey" FOREIGN KEY ("my_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friends_Peer" ADD CONSTRAINT "Friends_Peer_id_fkey" FOREIGN KEY ("id") REFERENCES "Friends"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

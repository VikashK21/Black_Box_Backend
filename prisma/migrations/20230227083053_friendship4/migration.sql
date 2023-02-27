/*
  Warnings:

  - Added the required column `peer_id` to the `Friends_Peer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Friends_Peer" DROP CONSTRAINT "Friends_Peer_id_fkey";

-- AlterTable
ALTER TABLE "Friends_Peer" ADD COLUMN     "peer_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Friends_Peer" ADD CONSTRAINT "Friends_Peer_peer_id_fkey" FOREIGN KEY ("peer_id") REFERENCES "Friends"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

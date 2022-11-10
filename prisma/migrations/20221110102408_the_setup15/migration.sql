/*
  Warnings:

  - You are about to alter the column `otp` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "otp" SET DATA TYPE INTEGER;

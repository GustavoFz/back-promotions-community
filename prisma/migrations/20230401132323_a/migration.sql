/*
  Warnings:

  - The primary key for the `Follows` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `followingId` on the `Follows` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hash]` on the table `Token` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `followedId` to the `Follows` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Follows" DROP CONSTRAINT "Follows_followingId_fkey";

-- AlterTable
ALTER TABLE "Follows" DROP CONSTRAINT "Follows_pkey",
DROP COLUMN "followingId",
ADD COLUMN     "followedId" INTEGER NOT NULL,
ADD CONSTRAINT "Follows_pkey" PRIMARY KEY ("followerId", "followedId");

-- CreateIndex
CREATE UNIQUE INDEX "Token_hash_key" ON "Token"("hash");

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followedId_fkey" FOREIGN KEY ("followedId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - Added the required column `type` to the `LikePost` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LikePost" (
    "postId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("postId", "userId"),
    CONSTRAINT "LikePost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LikePost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_LikePost" ("createdAt", "postId", "userId") SELECT "createdAt", "postId", "userId" FROM "LikePost";
DROP TABLE "LikePost";
ALTER TABLE "new_LikePost" RENAME TO "LikePost";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

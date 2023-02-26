/*
  Warnings:

  - The primary key for the `LikePost` table will be changed. If it partially fails, the table could be left without primary key constraint.

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
INSERT INTO "new_LikePost" ("createdAt", "postId", "type", "userId") SELECT "createdAt", "postId", "type", "userId" FROM "LikePost";
DROP TABLE "LikePost";
ALTER TABLE "new_LikePost" RENAME TO "LikePost";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

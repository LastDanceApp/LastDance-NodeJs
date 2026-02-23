/*
  Warnings:

  - You are about to drop the `Invitation` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `PromiseLooking` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Invitation";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PromiseLooking" (
    "userId" INTEGER NOT NULL,
    "promiseId" INTEGER NOT NULL,
    CONSTRAINT "PromiseLooking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PromiseLooking_promiseId_fkey" FOREIGN KEY ("promiseId") REFERENCES "Promise" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PromiseLooking" ("promiseId", "userId") SELECT "promiseId", "userId" FROM "PromiseLooking";
DROP TABLE "PromiseLooking";
ALTER TABLE "new_PromiseLooking" RENAME TO "PromiseLooking";
CREATE UNIQUE INDEX "PromiseLooking_userId_promiseId_key" ON "PromiseLooking"("userId", "promiseId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

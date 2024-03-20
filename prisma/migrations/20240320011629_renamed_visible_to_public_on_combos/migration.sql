/*
  Warnings:

  - You are about to drop the column `visible` on the `Combo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Combo" DROP COLUMN "visible",
ADD COLUMN     "public" BOOLEAN NOT NULL DEFAULT true;

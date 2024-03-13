/*
  Warnings:

  - Made the column `deckId` on table `Negation` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Negation" DROP CONSTRAINT "Negation_deckId_fkey";

-- AlterTable
ALTER TABLE "Negation" ALTER COLUMN "deckId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Negation" ADD CONSTRAINT "Negation_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

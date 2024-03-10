/*
  Warnings:

  - You are about to drop the column `deckId` on the `Negation` table. All the data in the column will be lost.
  - You are about to drop the `Deck` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Deck" DROP CONSTRAINT "Deck_cardId_fkey";

-- DropForeignKey
ALTER TABLE "Negation" DROP CONSTRAINT "Negation_deckId_fkey";

-- AlterTable
ALTER TABLE "Negation" DROP COLUMN "deckId";

-- DropTable
DROP TABLE "Deck";

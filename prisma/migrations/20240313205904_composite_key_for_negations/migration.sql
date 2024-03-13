/*
  Warnings:

  - The primary key for the `Negation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Negation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Negation" DROP CONSTRAINT "Negation_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Negation_pkey" PRIMARY KEY ("negatingCardId", "negatedCardId", "deckId");

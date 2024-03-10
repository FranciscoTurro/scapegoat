/*
  Warnings:

  - You are about to drop the `_negatedCard` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `negatedCardId` to the `Negation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_negatedCard" DROP CONSTRAINT "_negatedCard_A_fkey";

-- DropForeignKey
ALTER TABLE "_negatedCard" DROP CONSTRAINT "_negatedCard_B_fkey";

-- AlterTable
ALTER TABLE "Negation" ADD COLUMN     "negatedCardId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_negatedCard";

-- AddForeignKey
ALTER TABLE "Negation" ADD CONSTRAINT "Negation_negatedCardId_fkey" FOREIGN KEY ("negatedCardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

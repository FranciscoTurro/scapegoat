/*
  Warnings:

  - You are about to drop the column `comboId` on the `Card` table. All the data in the column will be lost.
  - Added the required column `cardId` to the `Combo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_comboId_fkey";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "comboId";

-- AlterTable
ALTER TABLE "Combo" ADD COLUMN     "cardId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Combo" ADD CONSTRAINT "Combo_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

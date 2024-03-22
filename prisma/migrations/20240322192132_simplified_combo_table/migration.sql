/*
  Warnings:

  - You are about to drop the `Step` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `content` to the `Combo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Step" DROP CONSTRAINT "Step_comboId_fkey";

-- AlterTable
ALTER TABLE "Combo" ADD COLUMN     "content" TEXT NOT NULL;

-- DropTable
DROP TABLE "Step";

/*
  Warnings:

  - The primary key for the `Negation` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_negatedCard" DROP CONSTRAINT "_negatedCard_B_fkey";

-- AlterTable
ALTER TABLE "Negation" DROP CONSTRAINT "Negation_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Negation_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Negation_id_seq";

-- AlterTable
ALTER TABLE "_negatedCard" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "_negatedCard" ADD CONSTRAINT "_negatedCard_B_fkey" FOREIGN KEY ("B") REFERENCES "Negation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

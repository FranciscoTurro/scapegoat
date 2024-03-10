-- AlterTable
ALTER TABLE "Negation" ADD COLUMN     "deckId" TEXT;

-- CreateTable
CREATE TABLE "Deck" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "coverCardId" TEXT NOT NULL,

    CONSTRAINT "Deck_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Negation" ADD CONSTRAINT "Negation_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deck" ADD CONSTRAINT "Deck_coverCardId_fkey" FOREIGN KEY ("coverCardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

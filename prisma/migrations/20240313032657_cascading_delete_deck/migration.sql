-- DropForeignKey
ALTER TABLE "Negation" DROP CONSTRAINT "Negation_deckId_fkey";

-- AddForeignKey
ALTER TABLE "Negation" ADD CONSTRAINT "Negation_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

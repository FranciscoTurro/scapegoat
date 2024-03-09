-- CreateTable
CREATE TABLE "Deck" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,

    CONSTRAINT "Deck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Negation" (
    "id" SERIAL NOT NULL,
    "deckId" TEXT NOT NULL,
    "negatingCardId" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,

    CONSTRAINT "Negation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_negatedCard" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_negatedCard_AB_unique" ON "_negatedCard"("A", "B");

-- CreateIndex
CREATE INDEX "_negatedCard_B_index" ON "_negatedCard"("B");

-- AddForeignKey
ALTER TABLE "Deck" ADD CONSTRAINT "Deck_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Negation" ADD CONSTRAINT "Negation_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Negation" ADD CONSTRAINT "Negation_negatingCardId_fkey" FOREIGN KEY ("negatingCardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_negatedCard" ADD CONSTRAINT "_negatedCard_A_fkey" FOREIGN KEY ("A") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_negatedCard" ADD CONSTRAINT "_negatedCard_B_fkey" FOREIGN KEY ("B") REFERENCES "Negation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

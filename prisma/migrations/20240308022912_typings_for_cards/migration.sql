/*
  Warnings:

  - The `attribute` column on the `Card` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `race` on the `Card` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Attributes" AS ENUM ('DARK', 'LIGHT', 'FIRE', 'WATER', 'EARTH', 'WIND', 'DIVINE');

-- CreateEnum
CREATE TYPE "Types" AS ENUM ('Aqua', 'Beast', 'Beast_Warrior', 'Continuous', 'Counter', 'Creator_God', 'Cyberse', 'Dinosaur', 'Divine_Beast', 'Dragon', 'Equip', 'Fairy', 'Field', 'Fiend', 'Fish', 'Insect', 'Machine', 'Normal', 'Plant', 'Psychic', 'Pyro', 'Quick_Play', 'Reptile', 'Ritual', 'Rock', 'Sea_Serpent', 'Spellcaster', 'Thunder', 'Warrior', 'Winged_Beast', 'Wyrm', 'Zombie');

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "attribute",
ADD COLUMN     "attribute" "Attributes",
DROP COLUMN "race",
ADD COLUMN     "race" "Types" NOT NULL;

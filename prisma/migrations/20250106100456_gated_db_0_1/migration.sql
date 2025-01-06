-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('GUEST', 'USER', 'ADMIN', 'SUPERADMIN');

-- CreateEnum
CREATE TYPE "KeywordType" AS ENUM ('weapon', 'armor', 'cybernetic');

-- CreateEnum
CREATE TYPE "CyberneticType" AS ENUM ('roll', 'stat', 'offensive', 'defensive', 'function');

-- CreateEnum
CREATE TYPE "ActionType" AS ENUM ('action', 'extendedAction', 'reaction');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "profilePicture" TEXT,
    "googleId" TEXT,
    "facebookId" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "profits" INTEGER NOT NULL DEFAULT 10,
    "stats" JSONB NOT NULL DEFAULT '{}',
    "picture" JSONB,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,
    "sex" TEXT NOT NULL,
    "background" TEXT NOT NULL,
    "attributes" JSONB NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Keyword" (
    "id" SERIAL NOT NULL,
    "keywordType" "KeywordType" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Keyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weapon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "picture" JSONB,
    "description" TEXT,
    "stats" JSONB NOT NULL,
    "price" INTEGER,
    "keywords" JSONB[],

    CONSTRAINT "Weapon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Armor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "picture" JSONB,
    "description" TEXT,
    "stats" JSONB NOT NULL,
    "price" INTEGER,
    "keywords" JSONB[],

    CONSTRAINT "Armor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cybernetic" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cyberneticType" "CyberneticType" NOT NULL,
    "stats" JSONB NOT NULL,
    "picture" JSONB,
    "description" TEXT NOT NULL,
    "body" TEXT[],
    "price" INTEGER,
    "keywords" JSONB[],

    CONSTRAINT "Cybernetic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Perk" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" JSONB,

    CONSTRAINT "Perk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Action" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "costs" JSONB,
    "attribute" TEXT,
    "skill" TEXT,
    "actionType" "ActionType" NOT NULL,
    "actionSubtypes" TEXT[],

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookEntry" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "BookEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CharacterToCybernetic" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CharacterToPerk" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CharacterToWeapon" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ArmorToCharacter" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CyberneticArmor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CyberneticWeapons" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CyberneticActions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "User_facebookId_key" ON "User"("facebookId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Keyword_name_keywordType_key" ON "Keyword"("name", "keywordType");

-- CreateIndex
CREATE UNIQUE INDEX "Weapon_name_key" ON "Weapon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Armor_name_key" ON "Armor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Cybernetic_name_key" ON "Cybernetic"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Perk_name_key" ON "Perk"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Action_name_key" ON "Action"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BookEntry_title_key" ON "BookEntry"("title");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterToCybernetic_AB_unique" ON "_CharacterToCybernetic"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterToCybernetic_B_index" ON "_CharacterToCybernetic"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterToPerk_AB_unique" ON "_CharacterToPerk"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterToPerk_B_index" ON "_CharacterToPerk"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterToWeapon_AB_unique" ON "_CharacterToWeapon"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterToWeapon_B_index" ON "_CharacterToWeapon"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ArmorToCharacter_AB_unique" ON "_ArmorToCharacter"("A", "B");

-- CreateIndex
CREATE INDEX "_ArmorToCharacter_B_index" ON "_ArmorToCharacter"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CyberneticArmor_AB_unique" ON "_CyberneticArmor"("A", "B");

-- CreateIndex
CREATE INDEX "_CyberneticArmor_B_index" ON "_CyberneticArmor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CyberneticWeapons_AB_unique" ON "_CyberneticWeapons"("A", "B");

-- CreateIndex
CREATE INDEX "_CyberneticWeapons_B_index" ON "_CyberneticWeapons"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CyberneticActions_AB_unique" ON "_CyberneticActions"("A", "B");

-- CreateIndex
CREATE INDEX "_CyberneticActions_B_index" ON "_CyberneticActions"("B");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToCybernetic" ADD CONSTRAINT "_CharacterToCybernetic_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToCybernetic" ADD CONSTRAINT "_CharacterToCybernetic_B_fkey" FOREIGN KEY ("B") REFERENCES "Cybernetic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToPerk" ADD CONSTRAINT "_CharacterToPerk_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToPerk" ADD CONSTRAINT "_CharacterToPerk_B_fkey" FOREIGN KEY ("B") REFERENCES "Perk"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToWeapon" ADD CONSTRAINT "_CharacterToWeapon_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToWeapon" ADD CONSTRAINT "_CharacterToWeapon_B_fkey" FOREIGN KEY ("B") REFERENCES "Weapon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArmorToCharacter" ADD CONSTRAINT "_ArmorToCharacter_A_fkey" FOREIGN KEY ("A") REFERENCES "Armor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArmorToCharacter" ADD CONSTRAINT "_ArmorToCharacter_B_fkey" FOREIGN KEY ("B") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CyberneticArmor" ADD CONSTRAINT "_CyberneticArmor_A_fkey" FOREIGN KEY ("A") REFERENCES "Armor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CyberneticArmor" ADD CONSTRAINT "_CyberneticArmor_B_fkey" FOREIGN KEY ("B") REFERENCES "Cybernetic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CyberneticWeapons" ADD CONSTRAINT "_CyberneticWeapons_A_fkey" FOREIGN KEY ("A") REFERENCES "Cybernetic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CyberneticWeapons" ADD CONSTRAINT "_CyberneticWeapons_B_fkey" FOREIGN KEY ("B") REFERENCES "Weapon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CyberneticActions" ADD CONSTRAINT "_CyberneticActions_A_fkey" FOREIGN KEY ("A") REFERENCES "Action"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CyberneticActions" ADD CONSTRAINT "_CyberneticActions_B_fkey" FOREIGN KEY ("B") REFERENCES "Cybernetic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

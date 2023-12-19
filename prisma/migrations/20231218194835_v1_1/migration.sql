/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Instrument` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Manufacturer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Artist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Manufacturer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Manufacturer" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "legitimacy" DROP NOT NULL,
ALTER COLUMN "mediaLink" DROP NOT NULL,
ALTER COLUMN "Timestamp" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Instrument_name_key" ON "Instrument"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Manufacturer_name_key" ON "Manufacturer"("name");

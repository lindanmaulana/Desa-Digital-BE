/*
  Warnings:

  - A unique constraint covering the columns `[social_assistance_recipient_id]` on the table `images` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "Entity" ADD VALUE 'SOCIAL_ASSISTANCE_RECIPIENT';

-- AlterTable
ALTER TABLE "images" ADD COLUMN     "social_assistance_recipient_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "images_social_assistance_recipient_id_key" ON "images"("social_assistance_recipient_id");

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_social_assistance_recipient_id_fkey" FOREIGN KEY ("social_assistance_recipient_id") REFERENCES "social_assistance_recipient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

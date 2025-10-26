/*
  Warnings:

  - You are about to drop the column `profile_picture` on the `family_members` table. All the data in the column will be lost.
  - You are about to drop the column `profile_picture` on the `head_of_families` table. All the data in the column will be lost.
  - You are about to drop the column `profile_picture` on the `staffs` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Entity" AS ENUM ('USER', 'SOCIAL_ASSISTANCE', 'DEVELOPMENT', 'EVENT', 'PROFILE');

-- AlterTable
ALTER TABLE "family_members" DROP COLUMN "profile_picture";

-- AlterTable
ALTER TABLE "head_of_families" DROP COLUMN "profile_picture";

-- AlterTable
ALTER TABLE "staffs" DROP COLUMN "profile_picture";

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "filename" VARCHAR NOT NULL,
    "path" VARCHAR NOT NULL,
    "profile_id" TEXT,
    "user_id" TEXT,
    "social_assistance_id" TEXT,
    "event_id" TEXT,
    "development_id" TEXT,
    "entity_type" "Entity" NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "images_user_id_key" ON "images"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "images_social_assistance_id_key" ON "images"("social_assistance_id");

-- CreateIndex
CREATE UNIQUE INDEX "images_event_id_key" ON "images"("event_id");

-- CreateIndex
CREATE UNIQUE INDEX "images_development_id_key" ON "images"("development_id");

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_social_assistance_id_fkey" FOREIGN KEY ("social_assistance_id") REFERENCES "social_assistance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_development_id_fkey" FOREIGN KEY ("development_id") REFERENCES "developments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

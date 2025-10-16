-- AlterTable
ALTER TABLE "social_assistance" ALTER COLUMN "thumbnail" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "is_active" SET DEFAULT false;

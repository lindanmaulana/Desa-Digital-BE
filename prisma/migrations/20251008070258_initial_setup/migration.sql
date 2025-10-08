-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'STAFF', 'HEAD_OF_FAMILY', 'RESIDENT');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Marital" AS ENUM ('SINGLE', 'MARRIED');

-- CreateEnum
CREATE TYPE "Relation" AS ENUM ('WIFE', 'CHILD', 'HUSBAND');

-- CreateEnum
CREATE TYPE "StatusDevelopment" AS ENUM ('ONGOING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'CANCELLED', 'EXPIRED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "CategorySocialAssistance" AS ENUM ('STAPLE', 'CASH', 'SUBSIDIZED_FUEL', 'HEALTH');

-- CreateEnum
CREATE TYPE "Bank" AS ENUM ('BRI', 'BNI', 'BCA', 'MANDIRI');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'RESIDENT',
    "is_first_login" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "head_of_families" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "profile_picture" VARCHAR(150),
    "identity_number" VARCHAR(20),
    "gender" "Gender" NOT NULL DEFAULT 'MALE',
    "date_of_birth" DATE,
    "phone_number" VARCHAR,
    "occupation" VARCHAR,
    "marital_status" "Marital" NOT NULL DEFAULT 'SINGLE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "head_of_families_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "family_members" (
    "id" TEXT NOT NULL,
    "head_of_family_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "profile_picture" VARCHAR,
    "identity_number" VARCHAR(20),
    "gender" "Gender" NOT NULL DEFAULT 'MALE',
    "date_of_birth" DATE,
    "phone_number" VARCHAR,
    "occupation" VARCHAR,
    "marital_status" "Marital" NOT NULL DEFAULT 'SINGLE',
    "relation" "Relation" NOT NULL DEFAULT 'CHILD',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "family_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "developments" (
    "id" TEXT NOT NULL,
    "thumbnail" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT NOT NULL,
    "person_in_charge" VARCHAR NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "status" "StatusDevelopment" NOT NULL DEFAULT 'ONGOING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "developments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "development_applicants" (
    "id" TEXT NOT NULL,
    "development_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "development_applicants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "thumbnail" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "date" DATE NOT NULL,
    "time" TIME NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_participants" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "head_of_family_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "total_price" DECIMAL(10,2) NOT NULL,
    "payment_status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_participants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "thumbnail" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "about" TEXT NOT NULL,
    "headman" VARCHAR NOT NULL,
    "people" INTEGER NOT NULL,
    "agricultural_area" DECIMAL(10,2) NOT NULL,
    "total_area" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile_images" (
    "id" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profile_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_assistance" (
    "id" TEXT NOT NULL,
    "thumbnail" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "category" "CategorySocialAssistance" NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "provider" VARCHAR NOT NULL,
    "description" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "social_assistance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_assistance_recipient" (
    "id" TEXT NOT NULL,
    "social_assistance_id" TEXT NOT NULL,
    "head_of_family_id" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "reason" TEXT NOT NULL,
    "bank" "Bank" NOT NULL,
    "account_number" VARCHAR(20) NOT NULL,
    "proof" VARCHAR NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "social_assistance_recipient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "head_of_families_user_id_key" ON "head_of_families"("user_id");

-- CreateIndex
CREATE INDEX "head_of_families_user_id_idx" ON "head_of_families"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "family_members_user_id_key" ON "family_members"("user_id");

-- CreateIndex
CREATE INDEX "family_members_user_id_idx" ON "family_members"("user_id");

-- AddForeignKey
ALTER TABLE "head_of_families" ADD CONSTRAINT "head_of_families_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "family_members" ADD CONSTRAINT "family_members_head_of_family_id_fkey" FOREIGN KEY ("head_of_family_id") REFERENCES "head_of_families"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "family_members" ADD CONSTRAINT "family_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "development_applicants" ADD CONSTRAINT "development_applicants_development_id_fkey" FOREIGN KEY ("development_id") REFERENCES "developments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "development_applicants" ADD CONSTRAINT "development_applicants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_participants" ADD CONSTRAINT "event_participants_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_participants" ADD CONSTRAINT "event_participants_head_of_family_id_fkey" FOREIGN KEY ("head_of_family_id") REFERENCES "head_of_families"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_images" ADD CONSTRAINT "profile_images_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_assistance_recipient" ADD CONSTRAINT "social_assistance_recipient_social_assistance_id_fkey" FOREIGN KEY ("social_assistance_id") REFERENCES "social_assistance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_assistance_recipient" ADD CONSTRAINT "social_assistance_recipient_head_of_family_id_fkey" FOREIGN KEY ("head_of_family_id") REFERENCES "head_of_families"("id") ON DELETE CASCADE ON UPDATE CASCADE;

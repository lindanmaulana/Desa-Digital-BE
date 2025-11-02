/*
  Warnings:

  - You are about to drop the column `otp_code` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UserOtpPurpose" AS ENUM ('ACTIVATION', 'RESET_PASSWORD');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "otp_code",
ADD COLUMN     "otp" VARCHAR(100),
ADD COLUMN     "otp_purpose" "UserOtpPurpose";

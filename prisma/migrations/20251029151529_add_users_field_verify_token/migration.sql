/*
  Warnings:

  - You are about to alter the column `otp_code` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "verify_token" VARCHAR(255),
ALTER COLUMN "otp_code" SET DATA TYPE VARCHAR(100);

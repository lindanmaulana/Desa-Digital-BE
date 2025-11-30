/*
  Warnings:

  - Added the required column `account_name` to the `social_assistance_recipient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "social_assistance_recipient" ADD COLUMN     "account_name" VARCHAR(100) NOT NULL;

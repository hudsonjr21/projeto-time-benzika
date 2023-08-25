/*
  Warnings:

  - Added the required column `location` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "games" ADD COLUMN     "location" TEXT NOT NULL;

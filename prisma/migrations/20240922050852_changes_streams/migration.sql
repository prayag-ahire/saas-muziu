/*
  Warnings:

  - Added the required column `extrectedId` to the `Stream` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Stream` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stream" ADD COLUMN     "extrectedId" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

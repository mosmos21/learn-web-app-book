/*
  Warnings:

  - Added the required column `title` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Task` ADD COLUMN `title` VARCHAR(191) NOT NULL,
    MODIFY `content` VARCHAR(191);

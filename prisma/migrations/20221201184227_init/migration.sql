/*
  Warnings:

  - Added the required column `pay_value` to the `sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sales` ADD COLUMN `pay_value` VARCHAR(191) NOT NULL;

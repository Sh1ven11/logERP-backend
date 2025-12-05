-- DropIndex
DROP INDEX "Destination_name_key";

-- AlterTable
ALTER TABLE "Destination" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

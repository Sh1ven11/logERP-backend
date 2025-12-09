-- AlterTable
ALTER TABLE "LorryHireChallan" ALTER COLUMN "tdsApplicable" DROP NOT NULL,
ALTER COLUMN "tdsApplicable" DROP DEFAULT,
ALTER COLUMN "tdsApplicable" SET DATA TYPE TEXT;

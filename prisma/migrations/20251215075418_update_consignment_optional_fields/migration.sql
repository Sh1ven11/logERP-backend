/*
  Warnings:

  - You are about to drop the column `brokerId` on the `ConsignmentNote` table. All the data in the column will be lost.
  - You are about to drop the column `driverName` on the `ConsignmentNote` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleNo` on the `ConsignmentNote` table. All the data in the column will be lost.
  - You are about to drop the column `slipNo` on the `LorryHireChallan` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[companyId,financialYearId,challanNumber]` on the table `LorryHireChallan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `billedToId` to the `ConsignmentNote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ConsignmentNote" DROP CONSTRAINT "ConsignmentNote_brokerId_fkey";

-- AlterTable
ALTER TABLE "ConsignmentNote" DROP COLUMN "brokerId",
DROP COLUMN "driverName",
DROP COLUMN "vehicleNo",
ADD COLUMN     "billedToId" INTEGER NOT NULL,
ALTER COLUMN "packages" DROP NOT NULL,
ALTER COLUMN "packageUom" DROP NOT NULL,
ALTER COLUMN "weightUom" DROP NOT NULL;

-- AlterTable
ALTER TABLE "LorryHireChallan" DROP COLUMN "slipNo",
ADD COLUMN     "driverLicenseNo" TEXT,
ADD COLUMN     "driverName" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "LorryHireChallan_companyId_financialYearId_challanNumber_key" ON "LorryHireChallan"("companyId", "financialYearId", "challanNumber");

-- AddForeignKey
ALTER TABLE "ConsignmentNote" ADD CONSTRAINT "ConsignmentNote_billedToId_fkey" FOREIGN KEY ("billedToId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "LorryHireChallan" (
    "id" SERIAL NOT NULL,
    "challanNumber" TEXT NOT NULL,
    "challanDate" TIMESTAMP(3) NOT NULL,
    "lorryHireDate" TIMESTAMP(3),
    "vehicleNo" TEXT NOT NULL,
    "slipNo" TEXT,
    "remarks" TEXT,
    "lorryOwnerId" INTEGER NOT NULL,
    "brokerId" INTEGER,
    "panCardUsed" TEXT,
    "tdsApplicable" BOOLEAN NOT NULL DEFAULT false,
    "tdsPercent" DOUBLE PRECISION,
    "destinationId" INTEGER NOT NULL,
    "totalPackages" INTEGER DEFAULT 0,
    "totalWeight" DOUBLE PRECISION DEFAULT 0,
    "rate" DOUBLE PRECISION,
    "lorryHire" DOUBLE PRECISION,
    "advancePaid" DOUBLE PRECISION DEFAULT 0,
    "balancePayable" DOUBLE PRECISION DEFAULT 0,
    "loadingCharges" DOUBLE PRECISION DEFAULT 0,
    "unloadingCharges" DOUBLE PRECISION DEFAULT 0,
    "dieselAdvance" DOUBLE PRECISION DEFAULT 0,
    "gstApplicable" BOOLEAN NOT NULL DEFAULT false,
    "gstAmount" DOUBLE PRECISION DEFAULT 0,
    "isSettled" BOOLEAN NOT NULL DEFAULT false,
    "paymentDate" TIMESTAMP(3),
    "consignmentCount" INTEGER DEFAULT 0,
    "companyId" INTEGER NOT NULL,
    "branchId" INTEGER NOT NULL,
    "financialYearId" INTEGER NOT NULL,
    "createdByUserId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LorryHireChallan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LorryHireChallanConsignment" (
    "id" SERIAL NOT NULL,
    "challanId" INTEGER NOT NULL,
    "consignmentId" INTEGER NOT NULL,

    CONSTRAINT "LorryHireChallanConsignment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LorryHireChallanConsignment_challanId_consignmentId_key" ON "LorryHireChallanConsignment"("challanId", "consignmentId");

-- AddForeignKey
ALTER TABLE "LorryHireChallan" ADD CONSTRAINT "LorryHireChallan_lorryOwnerId_fkey" FOREIGN KEY ("lorryOwnerId") REFERENCES "LorryOwner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LorryHireChallan" ADD CONSTRAINT "LorryHireChallan_brokerId_fkey" FOREIGN KEY ("brokerId") REFERENCES "Broker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LorryHireChallan" ADD CONSTRAINT "LorryHireChallan_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LorryHireChallan" ADD CONSTRAINT "LorryHireChallan_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LorryHireChallan" ADD CONSTRAINT "LorryHireChallan_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LorryHireChallan" ADD CONSTRAINT "LorryHireChallan_financialYearId_fkey" FOREIGN KEY ("financialYearId") REFERENCES "FinancialYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LorryHireChallan" ADD CONSTRAINT "LorryHireChallan_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LorryHireChallanConsignment" ADD CONSTRAINT "LorryHireChallanConsignment_challanId_fkey" FOREIGN KEY ("challanId") REFERENCES "LorryHireChallan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LorryHireChallanConsignment" ADD CONSTRAINT "LorryHireChallanConsignment_consignmentId_fkey" FOREIGN KEY ("consignmentId") REFERENCES "ConsignmentNote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

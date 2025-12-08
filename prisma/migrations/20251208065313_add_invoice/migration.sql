-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "invoiceNo" INTEGER NOT NULL,
    "invoiceDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "companyId" INTEGER NOT NULL,
    "branchId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,
    "billAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "balanceAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "deduction" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "tdsDeducted" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "creditDays" INTEGER,
    "stagingChargeRate" DOUBLE PRECISION,
    "stagingChargeAmount" DOUBLE PRECISION,
    "csRate" DOUBLE PRECISION DEFAULT 0,
    "insurance" DOUBLE PRECISION DEFAULT 0,
    "otherCharges" DOUBLE PRECISION DEFAULT 0,
    "gstPercent" DOUBLE PRECISION,
    "gstAmount" DOUBLE PRECISION,
    "finalAmount" DOUBLE PRECISION DEFAULT 0,
    "remarks" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceConsignment" (
    "id" SERIAL NOT NULL,
    "invoiceId" INTEGER NOT NULL,
    "consignmentId" INTEGER NOT NULL,

    CONSTRAINT "InvoiceConsignment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InvoiceConsignment_invoiceId_consignmentId_key" ON "InvoiceConsignment"("invoiceId", "consignmentId");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceConsignment" ADD CONSTRAINT "InvoiceConsignment_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceConsignment" ADD CONSTRAINT "InvoiceConsignment_consignmentId_fkey" FOREIGN KEY ("consignmentId") REFERENCES "ConsignmentNote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

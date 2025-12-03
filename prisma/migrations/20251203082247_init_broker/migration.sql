-- CreateTable
CREATE TABLE "Broker" (
    "id" SERIAL NOT NULL,
    "brokerCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "panCard" TEXT,
    "tdsPercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Broker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Broker_brokerCode_key" ON "Broker"("brokerCode");

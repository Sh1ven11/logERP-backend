/*
  Warnings:

  - You are about to drop the column `fromLocation` on the `ConsignmentNote` table. All the data in the column will be lost.
  - You are about to drop the column `toLocation` on the `ConsignmentNote` table. All the data in the column will be lost.
  - Added the required column `fromDestinationId` to the `ConsignmentNote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toDestinationId` to the `ConsignmentNote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ConsignmentNote" DROP COLUMN "fromLocation",
DROP COLUMN "toLocation",
ADD COLUMN     "fromDestinationId" INTEGER NOT NULL,
ADD COLUMN     "toDestinationId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Destination" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "state" TEXT,
    "pincode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Destination_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Destination_name_key" ON "Destination"("name");

-- AddForeignKey
ALTER TABLE "ConsignmentNote" ADD CONSTRAINT "ConsignmentNote_fromDestinationId_fkey" FOREIGN KEY ("fromDestinationId") REFERENCES "Destination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsignmentNote" ADD CONSTRAINT "ConsignmentNote_toDestinationId_fkey" FOREIGN KEY ("toDestinationId") REFERENCES "Destination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

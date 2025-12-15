import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Seed 2...");

  // --------------------------------------------------
  // 1. COMPANIES
  // --------------------------------------------------
  const companyA = await prisma.company.upsert({
    where: { code: "CMP001" },
    update: {},
    create: {
      name: "KTPL",
      code: "CMP001",
      address: "Mumbai",
      phone: "9999999999",
    },
  });

  const companyB = await prisma.company.upsert({
    where: { code: "CMP002" },
    update: {},
    create: {
      name: "MLPL",
      code: "CMP002",
      address: "Pune",
      phone: "8888888888",
    },
  });

  // --------------------------------------------------
  // 2. BRANCHES
  // --------------------------------------------------
  const branchA1 = await prisma.branch.upsert({
    where: { code: "JDL-MUM" },
    update: {},
    create: {
      name: "Jindal Mumbai Branch",
      code: "JDL-MUM",
      address: "Mumbai HQ",
      phone: "9000000001",
      companyId: companyA.id,
    },
  });

  const branchA2 = await prisma.branch.upsert({
    where: { code: "JDL-PUN" },
    update: {},
    create: {
      name: "Jindal Pune Branch",
      code: "JDL-PUN",
      address: "Pune Office",
      phone: "9000000002",
      companyId: companyA.id,
    },
  });

  const branchB1 = await prisma.branch.upsert({
    where: { code: "TATA-HYD" },
    update: {},
    create: {
      name: "Tata Hyderabad Branch",
      code: "TATA-HYD",
      address: "Hyderabad",
      phone: "9333333333",
      companyId: companyB.id,
    },
  });

  // --------------------------------------------------
  // 3. FINANCIAL YEARS
  // --------------------------------------------------
  const fyA2024 = await prisma.financialYear.create({
    data: {
      yearLabel: "2024-2025",
      startDate: new Date("2024-04-01"),
      endDate: new Date("2025-03-31"),
      companyId: companyA.id,
    },
  });

  const fyB2024 = await prisma.financialYear.create({
    data: {
      yearLabel: "2024-2025",
      startDate: new Date("2024-04-01"),
      endDate: new Date("2025-03-31"),
      companyId: companyB.id,
    },
  });

  // --------------------------------------------------
  // 4. USERS (must exist from seed1)
  // --------------------------------------------------
  const userShiven = await prisma.user.findUnique({ where: { username: "shiven" } });
  if (!userShiven) throw new Error("User 'shiven' not found (run seed1 first)");

  await prisma.userCompany.createMany({
    data: [
      { userId: userShiven.id, companyId: companyA.id, role: "admin" },
      { userId: userShiven.id, companyId: companyB.id, role: "manager" },
    ],
    skipDuplicates: true,
  });

  // --------------------------------------------------
  // 5. CUSTOMER GROUPS
  // --------------------------------------------------
  const groupJindal = await prisma.customerGroup.create({
    data: {
      name: "Jindal Group",
      companyId: companyA.id,
    },
  });

  const groupTata = await prisma.customerGroup.create({
    data: {
      name: "Tata Dealers",
      companyId: companyB.id,
    },
  });

  // --------------------------------------------------
  // 6. CUSTOMERS
  // --------------------------------------------------
  const custPune = await prisma.customer.create({
    data: {
      companyCode: "CUST-JDL-001",
      companyName: "Jindal Pune",
      billName: "JDL Pune",
      address1: "Pune Road",
      phone: "7777770001",
      companyId: companyA.id,
      branchId: branchA2.id,
      groupId: groupJindal.id,
    },
  });

  const custMumbai = await prisma.customer.create({
    data: {
      companyCode: "CUST-JDL-002",
      companyName: "Jindal Mumbai",
      billName: "JDL Mumbai",
      address1: "Mumbai Street",
      phone: "7777770002",
      companyId: companyA.id,
      branchId: branchA1.id,
      groupId: groupJindal.id,
    },
  });

  // --------------------------------------------------
  // 7. DESTINATIONS
  // --------------------------------------------------
  const destPune = await prisma.destination.create({ data: { name: "Pune", state: "MH" } });
  const destMumbai = await prisma.destination.create({ data: { name: "Mumbai", state: "MH" } });

  // --------------------------------------------------
  // 8. LORRY OWNER
  // --------------------------------------------------
  const ownerA = await prisma.lorryOwner.create({
    data: {
      name: "Raj Transport",
      address1: "Mumbai Highway",
      panNumber: "ABCDE1234F",
      companyId: companyA.id,
    },
  });

  // --------------------------------------------------
  // 9. CONSIGNMENT NOTE
  // --------------------------------------------------
  const consignment1 = await prisma.consignmentNote.create({
    data: {
      cnNumber: "1001",
      date: new Date("2024-04-10"),

      companyId: companyA.id,
      branchId: branchA1.id,
      financialYearId: fyA2024.id,

      consignorId: custPune.id,
      consigneeId: custMumbai.id,
      billedToId: custMumbai.id, // ✅ REQUIRED

      fromDestinationId: destPune.id,
      toDestinationId: destMumbai.id,

      packages: 12,
      packageUom: "bags",
      contents: "Steel Rods",

      weightUom: "mt",
      rate: 150,
      rateOn: "mt",

      remarks: "Handle with care",
      createdByUserId: userShiven.id,
    },
  });

  // --------------------------------------------------
  // 10. LORRY HIRE CHALLAN
  // --------------------------------------------------
  const challan1 = await prisma.lorryHireChallan.create({
    data: {
      challanNumber: "LHC-5001",
      challanDate: new Date("2024-04-11"),
      lorryHireDate: new Date("2024-04-12"),

      vehicleNo: "MH12AB1234",
      driverName: "Ramesh Kumar",
      driverLicenseNo: "MH1220190001234",

      lorryOwnerId: ownerA.id,
      destinationId: destMumbai.id,

      totalPackages: 12,
      totalWeight: 980,
      rate: 150,
      lorryHire: 147000,

      advancePaid: 20000,
      balancePayable: 127000,

      companyId: companyA.id,
      branchId: branchA1.id,
      financialYearId: fyA2024.id,

      createdByUserId: userShiven.id,
    },
  });

  // --------------------------------------------------
  // 11. LINK CN ↔ CHALLAN
  // --------------------------------------------------
  await prisma.lorryHireChallanConsignment.create({
    data: {
      challanId: challan1.id,
      consignmentId: consignment1.id,
    },
  });

  console.log("✅ Seed 2 completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed 2 failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

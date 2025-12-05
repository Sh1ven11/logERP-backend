import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log("Starting Seed 2...");

  // -----------------------------
  // 1. COMPANIES
  // -----------------------------
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

  // -----------------------------
  // 2. BRANCHES
  // -----------------------------
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

  // -----------------------------
  // 3. FINANCIAL YEARS
  // -----------------------------
  const fyA2024 = await prisma.financialYear.upsert({
    where: { id: 1 },
    update: {},
    create: {
      yearLabel: "2024-2025",
      startDate: new Date("2024-04-01"),
      endDate: new Date("2025-03-31"),
      companyId: companyA.id,
    },
  });

  const fyB2024 = await prisma.financialYear.upsert({
    where: { id: 2 },
    update: {},
    create: {
      yearLabel: "2024-2025",
      startDate: new Date("2024-04-01"),
      endDate: new Date("2025-03-31"),
      companyId: companyB.id,
    },
  });

  // -----------------------------
  // 4. USER COMPANY ROLES
  // -----------------------------
  const userShiven = await prisma.user.findUnique({ where: { username: "shiven" } });
  const userArvind = await prisma.user.findUnique({ where: { username: "arvind" } });

  if (!userShiven || !userArvind) {
    throw new Error("Users from Seed 1 must exist before running Seed 2.");
  }

  await prisma.userCompany.createMany({
    data: [
      { id: 1, userId: userShiven.id, companyId: companyA.id, role: "admin" },
      { id: 2, userId: userShiven.id, companyId: companyB.id, role: "manager" },
      { id: 3, userId: userArvind.id, companyId: companyA.id, role: "viewer" },
    ],
    skipDuplicates: true,
  });

  // -----------------------------
  // 5. CUSTOMER GROUPS
  // -----------------------------
  const groupJindal = await prisma.customerGroup.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Jindal Group",
      companyId: companyA.id,
    },
  });

  const groupTata = await prisma.customerGroup.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Tata Dealers",
      companyId: companyB.id,
    },
  });

  // -----------------------------
  // 6. CUSTOMERS
  // -----------------------------
  await prisma.customer.createMany({
    data: [
      {
        companyCode: "CUST-JDL-001",
        companyName: "Jindal Pune",
        billName: "JDL Pune",
        address1: "Pune Road",
        phone: "7777770001",
        debit: 1000,
        credit: 200,
        companyId: companyA.id,
        branchId: branchA2.id,
        groupId: groupJindal.id,
      },
      {
        companyCode: "CUST-JDL-002",
        companyName: "Jindal Mumbai",
        billName: "JDL Mumbai",
        address1: "Mumbai Street",
        phone: "7777770002",
        debit: 300,
        credit: 50,
        companyId: companyA.id,
        branchId: branchA1.id,
        groupId: groupJindal.id,
      },
      {
        companyCode: "CUST-TATA-001",
        companyName: "Tata Hyderabad",
        billName: "TATA Hyd",
        address1: "Hyd Market",
        phone: "7777770003",
        debit: 500,
        credit: 100,
        companyId: companyB.id,
        branchId: branchB1.id,
        groupId: groupTata.id,
      },
    ],
    skipDuplicates: true,
  });

  // -----------------------------
  // 7. BROKERS
  // -----------------------------
  await prisma.broker.createMany({
    data: [
      {
        brokerCode: "BRK-JDL-001",
        name: "Broker Pune",
        address: "Pune",
        phoneNo: "999110001",
        tdsPercentage: 2,
        companyId: companyA.id,
        branchId: branchA2.id,
      },
      {
        brokerCode: "BRK-JDL-002",
        name: "Broker Mumbai",
        address: "Mumbai",
        phoneNo: "999110002",
        tdsPercentage: 1,
        companyId: companyA.id,
        branchId: branchA1.id,
      },
      {
        brokerCode: "BRK-TATA-001",
        name: "Broker Hyd",
        address: "Hyderabad",
        phoneNo: "999110003",
        tdsPercentage: 3,
        companyId: companyB.id,
        branchId: branchB1.id,
      },
    ],
    skipDuplicates: true,
  });

  // -----------------------------
  // 8. DESTINATIONS (NEW)
  // -----------------------------
  const destPune = await prisma.destination.create({
    data: { name: "Pune", state: "MH", pincode: "411001" },
  });

  const destMumbai = await prisma.destination.create({
    data: { name: "Mumbai", state: "MH", pincode: "400001" },
  });

  const destHyd = await prisma.destination.create({
    data: { name: "Hyderabad", state: "TG", pincode: "500001" },
  });

  // -----------------------------
  // 9. CONSIGNMENT NOTES (Updated)
  // -----------------------------
  await prisma.consignmentNote.createMany({
    data: [
      {
        cnNumber: "1001",
        date: new Date("2024-04-10"),
        financialYearId: fyA2024.id,
        companyId: companyA.id,
        branchId: branchA1.id,

        consignorId: 1,
        consigneeId: 2,

        fromDestinationId: destPune.id,
        toDestinationId: destMumbai.id,

        packages: 12,
        packageUom: "bags",
        contents: "Steel Rods",

        gstPayableAt: "Destination",
        netWeight: 950,
        grossWeight: 1000,
        chargeWeight: 980,
        weightUom: "mt",

        rate: 150,
        rateOn: "mt",
        freightCharges: 147000,

        vehicleNo: "MH12AB1234",
        driverName: "Ramesh Kumar",
        remarks: "Handle with care",

        brokerId: 1,
        createdByUserId: userShiven.id,
      },

      {
        cnNumber: "1002",
        date: new Date("2024-05-02"),
        financialYearId: fyA2024.id,
        companyId: companyA.id,
        branchId: branchA2.id,

        consignorId: 2,
        consigneeId: 1,

        fromDestinationId: destMumbai.id,
        toDestinationId: destPune.id,

        packages: 8,
        packageUom: "lot",
        contents: "Scrap Metal",

        gstPayableAt: "Origin",
        netWeight: 500,
        grossWeight: 540,
        chargeWeight: 520,
        weightUom: "mt",

        rate: 200,
        rateOn: "fixed",
        freightCharges: 200,

        vehicleNo: "MH14XY9876",
        driverName: "Suresh Patil",
        remarks: "",

        brokerId: 2,
        createdByUserId: userShiven.id,
      },

      {
        cnNumber: "2001",
        date: new Date("2024-04-15"),
        financialYearId: fyB2024.id,
        companyId: companyB.id,
        branchId: branchB1.id,

        consignorId: 3,
        consigneeId: 1,

        fromDestinationId: destHyd.id,
        toDestinationId: destPune.id,

        packages: 15,
        packageUom: "set",
        contents: "Steel Billets",

        gstPayableAt: "Destination",
        netWeight: 1200,
        grossWeight: 1250,
        chargeWeight: 1220,
        weightUom: "mt",

        rate: 180,
        rateOn: "mt",
        freightCharges: 219600,

        vehicleNo: "TS09CZ4321",
        driverName: "Mahesh Gowda",
        remarks: "Urgent dispatch",

        brokerId: 3,
        createdByUserId: userArvind.id,
      },
    ],
  });

  console.log("Seed 2 completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error in Seed 2:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

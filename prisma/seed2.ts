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
      name: "Jindal Industries",
      code: "CMP001",
      address: "Mumbai",
      phone: "9999999999",
    },
  });

  const companyB = await prisma.company.upsert({
    where: { code: "CMP002" },
    update: {},
    create: {
      name: "Tata Steels",
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
  // 3. USER COMPANY ROLES
  // -----------------------------
  const userShiven = await prisma.user.findUnique({ where: { username: "shiven" } });
  const userArvind = await prisma.user.findUnique({ where: { username: "arvind" } });

  if (!userShiven || !userArvind) {
    throw new Error("Users from Seed 1 must exist before running Seed 2.");
  }

  await prisma.userCompany.upsert({
    where: { id: 1 },
    update: {},
    create: {
      userId: userShiven.id,
      companyId: companyA.id,
      role: "admin",
    },
  });

  await prisma.userCompany.upsert({
    where: { id: 2 },
    update: {},
    create: {
      userId: userShiven.id,
      companyId: companyB.id,
      role: "manager",
    },
  });

  await prisma.userCompany.upsert({
    where: { id: 3 },
    update: {},
    create: {
      userId: userArvind.id,
      companyId: companyA.id,
      role: "viewer",
    },
  });

  // -----------------------------
  // 4. CUSTOMER GROUPS
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
  // 5. CUSTOMERS
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
  // 6. BROKERS
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

  console.log("Seed 2 completed successfully!");
}

main()
  .catch(e => {
    console.error("Error in Seed 2:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

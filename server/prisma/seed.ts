import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import data from "./db.json";

async function main() {
  const tickets = data.tickets;
  const discounts = data.discounts;

  const seededTickets = await prisma.ticket.createMany({
    data: tickets,
  });
  const seededDiscounts = await prisma.discount.createMany({
    data: discounts,
  });
  console.log({ seededTickets, seededDiscounts });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

import { db } from "@/lib/prisma";

export const getTicketsByUser = async (userId) => {
  return await db.ticket.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
};

export const createTicket = async (data) => {
  return await db.ticket.create({ data });
};

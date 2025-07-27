import { db } from "@/lib/prisma";

export const getDealsByUser = async (userId) => {
  return await db.deal.findMany({
    where: { ownerId: userId },
    include: { lead: true },
    orderBy: { createdAt: 'desc' },
  });
};

export const createDeal = async (data) => {
  return await db.deal.create({ data });
};

export const deleteDeal = async (id, userId) => {
  return await db.deal.deleteMany({ where: { id, ownerId: userId } });
};

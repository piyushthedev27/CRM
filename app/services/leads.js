import { db } from "@/lib/prisma";

export const getLeadsByUser = async (userId) => {
  return await db.lead.findMany({ where: { ownerId: userId } });
};

export const createLead = async (data) => {
  return await db.lead.create({ data });
};

export const deleteLead = async (id, userId) => {
  return await db.lead.deleteMany({
    where: { id, ownerId: userId },
  });
};

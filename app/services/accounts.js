import { db } from "@/lib/prisma";

export const getAccountsByUser = async (userId) => {
  return await db.account.findMany({
    where: { ownerId: userId },
    include: { contacts: true },
    orderBy: { createdAt: 'desc' },
  });
};

export const createAccount = async (data) => {
  return await db.account.create({ data });
};

export const createContact = async (data) => {
  return await db.contact.create({ data });
};

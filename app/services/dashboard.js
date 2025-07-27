import { db } from "@/lib/prisma";

export const getDashboardStats = async (userId) => {
  const leads = await db.lead.count({ where: { ownerId: userId } });
  const deals = await db.deal.findMany({
    where: { ownerId: userId },
  });

  const totalDeals = deals.length;
  const wonDeals = deals.filter((d) => d.status === "Won");
  const lostDeals = deals.filter((d) => d.status === "Lost");

  const wonValue = wonDeals.reduce((sum, d) => sum + d.amount, 0);
  const lostValue = lostDeals.reduce((sum, d) => sum + d.amount, 0);
  const winRate = totalDeals ? ((wonDeals.length / totalDeals) * 100).toFixed(1) : 0;

  const stageCounts = {};
  deals.forEach((d) => {
    stageCounts[d.stage] = (stageCounts[d.stage] || 0) + 1;
  });

  return {
    leads,
    totalDeals,
    wonValue,
    lostValue,
    winRate,
    stageCounts,
  };
};

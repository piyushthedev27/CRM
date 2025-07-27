'use server';

import { currentUser } from '@clerk/nextjs/server';
import { getDashboardStats as fetchStats } from '@/services/dashboard';

export async function getDashboardStats() {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");
  return await fetchStats(user.id);
}

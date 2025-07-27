'use server';

import { currentUser } from "@clerk/nextjs/server";
import { createDeal, deleteDeal, getDealsByUser } from "@/services/deals";
import { getLeadsByUser } from "@/services/leads";

export async function fetchDeals() {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const deals = await getDealsByUser(user.id);
  return deals;
}

export async function fetchUserLeads() {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const leads = await getLeadsByUser(user.id);
  return leads;
}

export async function addDeal(formData) {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const data = {
    title: formData.get("title"),
    amount: parseFloat(formData.get("amount")),
    stage: formData.get("stage"),
    status: formData.get("status") || "Open",
    leadId: formData.get("leadId"),
    ownerId: user.id,
  };

  await createDeal(data);
}

export async function removeDeal(id) {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  await deleteDeal(id, user.id);
}

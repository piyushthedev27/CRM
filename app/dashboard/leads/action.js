'use server';

import { currentUser } from "@clerk/nextjs/server";
import { createLead, deleteLead, getLeadsByUser } from "@/services/leads";

export async function fetchLeads() {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const leads = await getLeadsByUser(user.id);
  return leads;
}

export async function addLead(formData) {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    status: formData.get("status") || "New",
    phone: formData.get("phone"),
    company: formData.get("company"),
    notes: formData.get("notes"),
    ownerId: user.id,
  };

  await createLead(data);
}

export async function removeLead(id) {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  await deleteLead(id, user.id);
}

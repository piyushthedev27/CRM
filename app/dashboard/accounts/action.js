'use server';

import { currentUser } from "@clerk/nextjs/server";
import { getAccountsByUser, createAccount, createContact } from "@/services/accounts";

export async function fetchAccounts() {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");
  return await getAccountsByUser(user.id);
}

export async function addAccount(formData) {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const data = {
    name: formData.get("name"),
    industry: formData.get("industry"),
    website: formData.get("website"),
    ownerId: user.id,
  };

  await createAccount(data);
}

export async function addContact(formData) {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    jobTitle: formData.get("jobTitle"),
    accountId: formData.get("accountId"),
    ownerId: user.id,
  };

  await createContact(data);
}

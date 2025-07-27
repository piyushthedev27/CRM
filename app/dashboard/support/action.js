'use server';

import { currentUser } from '@clerk/nextjs/server';
import { getAllTickets, updateTicketStatus } from '@/services/support';

export async function fetchAllTickets() {
  const user = await currentUser();
  if (!user || user.publicMetadata.role !== 'support') {
    throw new Error("Unauthorized");
  }
  return await getAllTickets();
}

export async function markTicketStatus(id, status) {
  const user = await currentUser();
  if (!user || user.publicMetadata.role !== 'support') {
    throw new Error("Unauthorized");
  }
  return await updateTicketStatus(id, status);
}

'use server';

import { currentUser } from '@clerk/nextjs/server';
import { getTicketsByUser, createTicket } from '@/services/tickets';

export async function fetchUserTickets() {
  const user = await currentUser();
  if (!user || user.publicMetadata.role !== 'customer') {
    throw new Error("Unauthorized");
  }

  return await getTicketsByUser(user.id);
}

export async function submitTicket(formData) {
  const user = await currentUser();
  if (!user || user.publicMetadata.role !== 'customer') {
    throw new Error("Unauthorized");
  }

  const data = {
    subject: formData.get('subject'),
    message: formData.get('message'),
    userId: user.id,
  };

  await createTicket(data);
}

'use client';

import { useEffect, useState } from 'react';
import { fetchAllTickets, markTicketStatus } from './action';
import { Button } from '@/components/ui/button';

export default function SupportDashboard() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchAllTickets().then(setTickets);
  }, []);

  const handleStatusChange = async (id, status) => {
    await markTicketStatus(id, status);
    setTickets(await fetchAllTickets());
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Support Tickets</h2>

      {tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="border p-4 rounded shadow-sm bg-muted/20">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{ticket.subject}</h3>
                <span className="text-sm px-2 py-1 rounded bg-muted text-muted-foreground">
                  {ticket.status}
                </span>
              </div>
              <p className="text-sm mb-2">{ticket.message}</p>
              <p className="text-xs text-muted-foreground">Submitted by: {ticket.userId}</p>
              <div className="flex gap-2 mt-3">
                <Button size="sm" onClick={() => handleStatusChange(ticket.id, 'Resolved')}>
                  Mark Resolved
                </Button>
                <Button size="sm" variant="secondary" onClick={() => handleStatusChange(ticket.id, 'Closed')}>
                  Close
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

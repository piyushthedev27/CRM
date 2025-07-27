'use client';

import { useEffect, useState } from 'react';
import { fetchUserTickets, submitTicket } from './action';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function ClientPortalPage() {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({ subject: '', message: '' });

  useEffect(() => {
    fetchUserTickets().then(setTickets).catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('subject', form.subject);
    data.append('message', form.message);
    await submitTicket(data);
    setForm({ subject: '', message: '' });
    setTickets(await fetchUserTickets());
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Client Portal</h1>

      <form onSubmit={handleSubmit} className="space-y-3 mb-8">
        <Input
          placeholder="Subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          required
        />
        <Textarea
          placeholder="Describe your issue"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
        />
        <Button type="submit">Submit Ticket</Button>
      </form>

      <div className="space-y-4">
        {tickets.length === 0 ? (
          <p className="text-muted-foreground">No tickets submitted yet.</p>
        ) : (
          tickets.map((ticket) => (
            <div key={ticket.id} className="border p-4 rounded bg-muted/20">
              <h3 className="font-semibold">{ticket.subject}</h3>
              <p className="text-sm mt-1 text-muted-foreground">{ticket.message}</p>
              <p className="text-xs mt-2 text-right text-muted">Status: {ticket.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

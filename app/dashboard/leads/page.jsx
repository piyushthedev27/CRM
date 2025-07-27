'use client';

import { useEffect, useState } from 'react';
import { fetchLeads, addLead, removeLead } from './action';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    notes: '',
  });

  useEffect(() => {
    fetchLeads().then(setLeads);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    await addLead(data);
    const leads = await fetchLeads();
    setLeads(leads);
    setForm({ name: '', email: '', phone: '', company: '', notes: '' });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Leads</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6 max-w-md">
        <Input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <Input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <Input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <Input
          placeholder="Company"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />
        <Textarea
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
        <Button type="submit">Add Lead</Button>
      </form>

      <div className="grid gap-4">
        {leads.map((lead) => (
          <div key={lead.id} className="border rounded p-4 shadow-sm">
            <h3 className="font-semibold">{lead.name}</h3>
            <p>Email: {lead.email}</p>
            <p>Phone: {lead.phone}</p>
            <p>Company: {lead.company}</p>
            <p>Status: {lead.status}</p>
            <p className="text-sm text-muted">{lead.notes}</p>
            <Button
              variant="destructive"
              className="mt-2"
              onClick={() => {
                removeLead(lead.id).then(() => {
                  fetchLeads().then(setLeads);
                });
              }}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { fetchDeals, addDeal, removeDeal, fetchUserLeads } from './action';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

export default function DealsPage() {
  const [deals, setDeals] = useState([]);
  const [leads, setLeads] = useState([]);
  const [form, setForm] = useState({
    title: '',
    amount: '',
    stage: 'Proposal',
    status: 'Open',
    leadId: '',
  });

  useEffect(() => {
    fetchDeals().then(setDeals);
    fetchUserLeads().then(setLeads);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    await addDeal(data);
    setDeals(await fetchDeals());
    setForm({ title: '', amount: '', stage: 'Proposal', status: 'Open', leadId: '' });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Deals</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6 max-w-md">
        <Input
          placeholder="Deal Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <Input
          placeholder="Amount"
          type="number"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
        />

        <Select value={form.stage} onValueChange={(val) => setForm({ ...form, stage: val })}>
          <SelectTrigger>
            <SelectValue placeholder="Select Stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Proposal">Proposal</SelectItem>
            <SelectItem value="Negotiation">Negotiation</SelectItem>
            <SelectItem value="Demo">Demo</SelectItem>
          </SelectContent>
        </Select>

        <Select value={form.status} onValueChange={(val) => setForm({ ...form, status: val })}>
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Open">Open</SelectItem>
            <SelectItem value="Won">Won</SelectItem>
            <SelectItem value="Lost">Lost</SelectItem>
          </SelectContent>
        </Select>

        <Select value={form.leadId} onValueChange={(val) => setForm({ ...form, leadId: val })}>
          <SelectTrigger>
            <SelectValue placeholder="Link to Lead" />
          </SelectTrigger>
          <SelectContent>
            {leads.map((lead) => (
              <SelectItem key={lead.id} value={lead.id}>
                {lead.name} ({lead.email})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button type="submit">Add Deal</Button>
      </form>

      <div className="grid gap-4">
        {deals.map((deal) => (
          <div key={deal.id} className="border rounded p-4 shadow-sm">
            <h3 className="font-semibold">{deal.title}</h3>
            <p>Amount: ₹{deal.amount}</p>
            <p>Status: {deal.status}</p>
            <p>Stage: {deal.stage}</p>
            <p>Lead: {deal.lead?.name} ({deal.lead?.email})</p>
            <Button
              variant="destructive"
              className="mt-2"
              onClick={() => {
                removeDeal(deal.id).then(() => fetchDeals().then(setDeals));
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

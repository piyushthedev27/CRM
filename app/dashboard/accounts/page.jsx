'use client';

import { useEffect, useState } from 'react';
import { fetchAccounts, addAccount, addContact } from './action';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AccountsPage() {
  const [accounts, setAccounts] = useState([]);
  const [accountForm, setAccountForm] = useState({ name: '', industry: '', website: '' });
  const [contactForms, setContactForms] = useState({}); // accountId → contact form data

  useEffect(() => {
    fetchAccounts().then(setAccounts);
  }, []);

  const handleAccountSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(accountForm).forEach(([k, v]) => data.append(k, v));
    await addAccount(data);
    setAccounts(await fetchAccounts());
    setAccountForm({ name: '', industry: '', website: '' });
  };

  const handleContactSubmit = async (accountId) => {
    const form = contactForms[accountId];
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    data.append('accountId', accountId);
    await addContact(data);
    setAccounts(await fetchAccounts());
    setContactForms({ ...contactForms, [accountId]: { name: '', email: '', phone: '', jobTitle: '' } });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Accounts</h2>

      {/* Account Create Form */}
      <form onSubmit={handleAccountSubmit} className="space-y-4 max-w-md mb-8">
        <Input
          placeholder="Account Name"
          value={accountForm.name}
          onChange={(e) => setAccountForm({ ...accountForm, name: e.target.value })}
          required
        />
        <Input
          placeholder="Industry"
          value={accountForm.industry}
          onChange={(e) => setAccountForm({ ...accountForm, industry: e.target.value })}
        />
        <Input
          placeholder="Website"
          value={accountForm.website}
          onChange={(e) => setAccountForm({ ...accountForm, website: e.target.value })}
        />
        <Button type="submit">Add Account</Button>
      </form>

      {/* Account List with Nested Contacts */}
      <div className="grid gap-6">
        {accounts.map((account) => (
          <div key={account.id} className="border p-4 rounded shadow-sm">
            <h3 className="text-lg font-semibold">{account.name}</h3>
            <p className="text-muted-foreground text-sm">{account.industry} | {account.website}</p>

            <div className="mt-4">
              <h4 className="font-semibold mb-2">Contacts</h4>
              {account.contacts.length === 0 && <p className="text-sm text-muted">No contacts yet.</p>}
              {account.contacts.map((c) => (
                <div key={c.id} className="border rounded p-2 mb-2">
                  <p><strong>{c.name}</strong> — {c.jobTitle}</p>
                  <p>Email: {c.email} | Phone: {c.phone}</p>
                </div>
              ))}

              {/* Add Contact Form */}
              <div className="mt-2 space-y-2">
                <Input
                  placeholder="Name"
                  value={contactForms[account.id]?.name || ''}
                  onChange={(e) =>
                    setContactForms((prev) => ({
                      ...prev,
                      [account.id]: { ...prev[account.id], name: e.target.value },
                    }))
                  }
                />
                <Input
                  placeholder="Email"
                  value={contactForms[account.id]?.email || ''}
                  onChange={(e) =>
                    setContactForms((prev) => ({
                      ...prev,
                      [account.id]: { ...prev[account.id], email: e.target.value },
                    }))
                  }
                />
                <Input
                  placeholder="Phone"
                  value={contactForms[account.id]?.phone || ''}
                  onChange={(e) =>
                    setContactForms((prev) => ({
                      ...prev,
                      [account.id]: { ...prev[account.id], phone: e.target.value },
                    }))
                  }
                />
                <Input
                  placeholder="Job Title"
                  value={contactForms[account.id]?.jobTitle || ''}
                  onChange={(e) =>
                    setContactForms((prev) => ({
                      ...prev,
                      [account.id]: { ...prev[account.id], jobTitle: e.target.value },
                    }))
                  }
                />
                <Button onClick={() => handleContactSubmit(account.id)}>Add Contact</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

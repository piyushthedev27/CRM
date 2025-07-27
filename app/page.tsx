'use client';

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div>
      <SignedIn>
        <UserButton />
        <h1>Welcome to the CRM</h1>
      </SignedIn>
      <SignedOut>
        <a href="/sign-in">Sign In</a>
      </SignedOut>
    </div>
  );
}

'use client';
import { useUser } from '@clerk/nextjs';

export function RoleGuard({ role, children }) {
  const { user } = useUser();
  const userRole = user?.publicMetadata?.role;

  if (userRole !== role) return <p>Access Denied</p>;

  return <>{children}</>;
}

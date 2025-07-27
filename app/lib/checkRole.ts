import { currentUser } from "@clerk/nextjs";

export async function getUserRole() {
  const user = await currentUser();
  return user?.publicMetadata?.role ?? null;
}

export async function isRole(...roles: string[]) {
  const role = await getUserRole();
  return roles.includes(role as string);
}

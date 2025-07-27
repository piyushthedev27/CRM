'use server';

import { currentUser } from '@clerk/nextjs/server';
import { getProjectsByUser, createProject, createTask } from '@/services/projects';

export async function fetchProjects() {
  const user = await currentUser();
  if (!user) throw new Error('Unauthorized');

  return await getProjectsByUser(user.id);
}

export async function addProject(formData) {
  const user = await currentUser();
  if (!user) throw new Error('Unauthorized');

  const data = {
    name: formData.get('name'),
    description: formData.get('description'),
    accountId: formData.get('accountId') || 'demo', // You can link real accounts later
    ownerId: user.id,
  };

  await createProject(data);
}

export async function addTask(formData) {
  const user = await currentUser();
  if (!user) throw new Error('Unauthorized');

  const data = {
    title: formData.get('title'),
    description: formData.get('description'),
    projectId: formData.get('projectId'),
    assignedTo: user.id,
  };

  await createTask(data);
}

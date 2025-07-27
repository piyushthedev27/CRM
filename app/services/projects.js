import { db } from '@/lib/prisma';

export const getProjectsByUser = async (userId) => {
  return await db.project.findMany({
    where: { ownerId: userId },
    include: { tasks: true },
    orderBy: { createdAt: 'desc' },
  });
};

export const createProject = async (data) => {
  return await db.project.create({ data });
};

export const createTask = async (data) => {
  return await db.task.create({ data });
};

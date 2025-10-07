'use server';


import { prisma } from '@/lib/prismaClient';
import { revalidatePath } from 'next/cache';


export async function getProjects() {
  try {
    const projects = await prisma.projects.findMany({
      include: {
        tags: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: projects };
  } catch (error) {
    return { success: false, error: 'Failed to fetch projects' };
  }
}

export async function createProject(data: {
  name: string;
  description?: string;
  thubnail?: string;
  notionLink?: string;
  githubLink?: string;
  liveLink?: string;
  tagId: string;
  featured?: boolean;
}) {
  try {
    const project = await prisma.projects.create({
      data,
    });
    revalidatePath('/admin');
    return { success: true, data: project };
  } catch (error) {
    return { success: false, error: 'Failed to create project' };
  }
}

export async function updateProject(id: string, data: {
  name: string;
  description?: string;
  thubnail?: string;
  notionLink?: string;
  githubLink?: string;
  liveLink?: string;
  tagId: string;
  featured?: boolean;
}) {
  try {
    const updated = await prisma.projects.update({
      where: { id },
      data,
    });
    revalidatePath('/admin');
    return { success: true, data: updated };
  } catch (error) {
    return { success: false, error: 'Failed to update project' };
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.projects.delete({
      where: { id },
    });
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete project' };
  }
}

// ==================== TAGS ACTIONS ====================

export async function getTags() {
  try {
    const tags = await prisma.tags.findMany({
      include: {
        _count: {
          select: { projects: true },
        },
      },
      orderBy: { name: 'asc' },
    });
    return { success: true, data: tags };
  } catch (error) {
    return { success: false, error: 'Failed to fetch tags' };
  }
}

export async function createTag(data: { name: string }) {
  try {
    const tag = await prisma.tags.create({
      data,
    });
    revalidatePath('/admin');
    return { success: true, data: tag };
  } catch (error) {
    return { success: false, error: 'Failed to create tag' };
  }
}

export async function updateTag(id: string, data: { name: string }) {
  try {
    const updated = await prisma.tags.update({
      where: { id },
      data,
    });
    revalidatePath('/admin');
    return { success: true, data: updated };
  } catch (error) {
    return { success: false, error: 'Failed to update tag' };
  }
}

export async function deleteTag(id: string) {
  try {
    await prisma.tags.delete({
      where: { id },
    });
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete tag' };
  }
}
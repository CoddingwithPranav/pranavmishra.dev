'use server';


import { prisma } from '@/lib/prismaClient';
import { revalidatePath } from 'next/cache';

export async function getSkills(aboutMeId: string) {
  try {
    const skills = await prisma.skills.findMany({
      where: { aboutMeId },
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: skills };
  } catch (error) {
    return { success: false, error: 'Failed to fetch skills' };
  }
}

export async function createSkill(data: {
  name: string;
  level: number;
  aboutMeId: string;
}) {
  try {
    const skill = await prisma.skills.create({
      data,
    });
    revalidatePath('/admin');
    return { success: true, data: skill };
  } catch (error) {
    return { success: false, error: 'Failed to create skill' };
  }
}

export async function updateSkill(id: string, data: {
  name: string;
  level: number;
}) {
  try {
    const updated = await prisma.skills.update({
      where: { id },
      data,
    });
    revalidatePath('/admin');
    return { success: true, data: updated };
  } catch (error) {
    return { success: false, error: 'Failed to update skill' };
  }
}

export async function deleteSkill(id: string) {
  try {
    await prisma.skills.delete({
      where: { id },
    });
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete skill' };
  }
}
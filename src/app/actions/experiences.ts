'use server';


import { prisma } from '@/lib/prismaClient';
import { revalidatePath } from 'next/cache';

export async function getExperiences(aboutMeId: string) {
  try {
    const experiences = await prisma.experiences.findMany({
      where: { aboutMeId },
      orderBy: { startDate: 'desc' },
    });
    return { success: true, data: experiences };
  } catch (error) {
    return { success: false, error: 'Failed to fetch experiences' };
  }
}

export async function createExperience(data: {
  title: string;
  company: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  aboutMeId: string;
}) {
  try {
    const experience = await prisma.experiences.create({
      data,
    });
    revalidatePath('/admin');
    return { success: true, data: experience };
  } catch (error) {
    return { success: false, error: 'Failed to create experience' };
  }
}

export async function updateExperience(id: string, data: {
  title: string;
  company: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
}) {
  try {
    const updated = await prisma.experiences.update({
      where: { id },
      data,
    });
    revalidatePath('/admin');
    return { success: true, data: updated };
  } catch (error) {
    return { success: false, error: 'Failed to update experience' };
  }
}

export async function deleteExperience(id: string) {
  try {
    await prisma.experiences.delete({
      where: { id },
    });
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete experience' };
  }
}

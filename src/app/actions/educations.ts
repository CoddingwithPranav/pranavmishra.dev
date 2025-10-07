'use server';


import { prisma } from '@/lib/prismaClient';
import { revalidatePath } from 'next/cache';


export async function getEducations(aboutMeId: string) {
  try {
    const educations = await prisma.educations.findMany({
      where: { aboutMeId },
      orderBy: { startDate: 'desc' },
    });
    return { success: true, data: educations };
  } catch (error) {
    return { success: false, error: 'Failed to fetch educations' };
  }
}

export async function createEducation(data: {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: Date;
  endDate?: Date;
  grade?: string;
  description?: string;
  aboutMeId: string;
}) {
  try {
    const education = await prisma.educations.create({
      data,
    });
    revalidatePath('/admin');
    return { success: true, data: education };
  } catch (error) {
    return { success: false, error: 'Failed to create education' };
  }
}

export async function updateEducation(id: string, data: {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: Date;
  endDate?: Date;
  grade?: string;
  description?: string;
}) {
  try {
    const updated = await prisma.educations.update({
      where: { id },
      data,
    });
    revalidatePath('/admin');
    return { success: true, data: updated };
  } catch (error) {
    return { success: false, error: 'Failed to update education' };
  }
}

export async function deleteEducation(id: string) {
  try {
    await prisma.educations.delete({
      where: { id },
    });
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete education' };
  }
}

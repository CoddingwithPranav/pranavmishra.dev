"use server";

import { prisma } from '@/lib/prismaClient';
import { revalidatePath } from 'next/cache';

export async function getRetrospectives(aboutMeId: string) {
  try {
    const retrospectives = await prisma.retrospectives.findMany({
      where: { aboutMeId },
      orderBy: { year: 'desc' },
    });
    console.log("Fetched retrospectives:", retrospectives);
    return { success: true, data: retrospectives };
  } catch (error) {
    return { success: false, error: 'Failed to fetch retrospectives' };
  }
}

export async function createRetrospective(data: {
  year: string;
  title: string;
  description: string;
  views?: number;
  aboutMeId: string;
}) {
  try {
    const created = await prisma.retrospectives.create({
      data: {
        ...data,
        views: data.views ?? 0,
      },
    });
    revalidatePath('/admin');
    return { success: true, data: created };
  } catch (error) {
    return { success: false, error: 'Failed to create retrospective' };
  }
}

export async function updateRetrospective(id: string, data: {
  year?: string;
  title?: string;
  description?: string;
  views?: number;
}) {
  try {
    const updated = await prisma.retrospectives.update({
      where: { id },
      data,
    });
    console.log("Updated retrospective:", updated);
    revalidatePath('/admin');
    return { success: true, data: updated };
  } catch (error) {
    return { success: false, error: 'Failed to update retrospective' };
  }
}

export async function deleteRetrospective(id: string) {
  try {
    const deleted = await prisma.retrospectives.delete({
      where: { id },
    });
    console.log("Deleted retrospective:", deleted);
    revalidatePath('/admin');
    return { success: true, data: deleted };
  } catch (error) {
    return { success: false, error: 'Failed to delete retrospective' };
  }
}
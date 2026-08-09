"use server";

import { prisma } from '@/lib/prismaClient';
import { revalidatePath } from 'next/cache';

export async function getAboutMe() {
  try {
    const aboutMe = await prisma.aboutMe.findFirst({
      // Ordered here so the About page timeline reads newest-first without
      // having to sort client-side.
      include: {
        skills: true,
        experiences: { orderBy: { startDate: 'desc' } },
        educations: { orderBy: { startDate: 'desc' } },
        socialLinks: true,
        retrospectives: { orderBy: { year: 'desc' } },
      },
    });
    return { success: true, data: aboutMe };
  } catch (error) {
    return { success: false, error: 'Failed to fetch about me data' };
  }
}

export async function updateAboutMe(id: string, data: {
  name: string;
  title: string;
  bio: string;
  email?: string;
  phone?: string;
  address?: string;
  profileImage?: string;
  techStack?: string[];
  currentActivities?: string[];
}) {
  try {
    const updated = await prisma.aboutMe.update({
      where: { id },
      data,
    });
    revalidatePath('/admin');
    return { success: true, data: updated };
  } catch (error) {
    return { success: false, error: 'Failed to update about me' };
  }
}

export async function createAboutMe(data: {
  name: string;
  title: string;
  bio: string;
  email?: string;
  phone?: string;
  address?: string;
  profileImage?: string;
  techStack?: string[];
  currentActivities?: string[];
}) {
  try {
    const created = await prisma.aboutMe.create({
      data,
    });
    revalidatePath('/admin');
    return { success: true, data: created };
  } catch (error) {
    return { success: false, error: 'Failed to create about me' };
  }
}
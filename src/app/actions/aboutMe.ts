"use server";

import { prisma } from '@/lib/prismaClient';
import { revalidatePath } from 'next/cache';

export async function getAboutMe() {
  try {
    const aboutMe = await prisma.aboutMe.findFirst({
      include: {
        skills: true,
        experiences: true,
        educations: true,
        socialLinks: true,
        retrospectives: true,
      },
    });
    console.log("Fetched about me:", aboutMe);
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
    console.log("Updated about me:", updated);
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
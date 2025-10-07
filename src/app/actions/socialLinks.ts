'use server';


import { prisma } from '@/lib/prismaClient';
import { revalidatePath } from 'next/cache';

export async function getSocialLinks(aboutMeId: string) {
  try {
    const links = await prisma.socialLinks.findMany({
      where: { aboutMeId },
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: links };
  } catch (error) {
    return { success: false, error: 'Failed to fetch social links' };
  }
}

export async function createSocialLink(data: {
  platform: string;
  url: string;
  icon?: string;
  aboutMeId: string;
}) {
  try {
    const link = await prisma.socialLinks.create({
      data,
    });
    revalidatePath('/admin');
    return { success: true, data: link };
  } catch (error) {
    return { success: false, error: 'Failed to create social link' };
  }
}

export async function updateSocialLink(id: string, data: {
  platform: string;
  url: string;
  icon?: string;
}) {
  try {
    const updated = await prisma.socialLinks.update({
      where: { id },
      data,
    });
    revalidatePath('/admin');
    return { success: true, data: updated };
  } catch (error) {
    return { success: false, error: 'Failed to update social link' };
  }
}

export async function deleteSocialLink(id: string) {
  try {
    await prisma.socialLinks.delete({
      where: { id },
    });
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete social link' };
  }
}
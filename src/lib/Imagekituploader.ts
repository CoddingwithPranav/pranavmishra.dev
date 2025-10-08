// lib/ImagekitUploader.ts

import { imagekit } from "./Imagekit";

interface UploadData {
  file: Buffer | string; // Buffer for server-side file uploads
  fileName: string;
}

/**
 * Handles server-side file upload to ImageKit.
 *
 * @param data - Object containing the file buffer and file name.
 * @returns A promise that resolves with the uploaded file URL, or null on error.
 */
export const handleImageKitUpload = async ({
  file,
  fileName,
}: UploadData): Promise<string | null> => {
  try {
    const uploadResponse = await imagekit.upload({
      file, // Buffer or file path
      fileName, // Name of the file
      folder: "/uploads", // Optional: specify a folder in ImageKit
    });

    console.log("Upload response:", uploadResponse);
    return uploadResponse.url;
  } catch (error: any) {
    console.error("ImageKit upload error:", error.message);
    return null;
  }
};
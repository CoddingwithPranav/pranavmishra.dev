"use server";

import { handleImageKitUpload } from "@/lib/Imagekituploader";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Parse form data
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert File to Buffer for ImageKit
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name;

    // Upload to ImageKit
    const url = await handleImageKitUpload({ file: buffer, fileName });

    if (!url) {
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true, url });
  } catch (error: any) {
    console.error("Server action error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
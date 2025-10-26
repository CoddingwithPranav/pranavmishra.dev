import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    
    if (password === process.env.ADMIN_PASSWORD) {
      const hashedPassword =  bcrypt.hashSync(process.env.ADMIN_PASSWORD || "", 10);
      (await cookies()).set("auth_token", hashedPassword, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      });
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: "Invalid password" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
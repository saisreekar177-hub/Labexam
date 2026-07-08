import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { comparePassword, generateToken } from "@/lib/auth-utils";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { status: "error", message: "Email and password are required" },
        { status: 400 }
      );
    }

    let admin = null;
    let attempts = 3;
    while (attempts > 0) {
      try {
        admin = await db.admin.findUnique({
          where: { email: email.toLowerCase() },
        });
        break;
      } catch (dbError: any) {
        attempts--;
        if (attempts === 0) throw dbError;
        console.warn(`Database connection failed on admin login, retrying in 1.5s... (Attempts left: ${attempts})`);
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
    }

    if (!admin) {
      console.log(`[ADMIN LOGIN FAIL] Admin with email: ${email} not found in database.`);
      return NextResponse.json(
        { status: "error", message: `Authentication failed: Admin record for '${email}' not registered.` },
        { status: 401 }
      );
    }

    console.log(`[ADMIN LOGIN] Admin '${admin.email}' found. Verifying password...`);
    const isPasswordValid = comparePassword(password, admin.password);
    if (!isPasswordValid) {
      const parts = admin.password.split(":");
      let reason = "Password mismatch.";
      if (parts.length !== 2) {
        reason = "Stored password hash format is corrupted or missing salt:hash separator.";
      }
      console.log(`[ADMIN LOGIN FAIL] Admin '${admin.email}' password mismatch. Reason: ${reason}`);
      return NextResponse.json(
        { status: "error", message: `Authentication failed: ${reason}` },
        { status: 401 }
      );
    }
    console.log(`[ADMIN LOGIN SUCCESS] Admin '${admin.email}' logged in successfully.`);

    const token = generateToken({
      id: admin.id,
      email: admin.email,
      role: "Admin",
    });

    return NextResponse.json({
      status: "success",
      token,
      profile: {
        email: admin.email,
        role: "Admin",
      },
    });
  } catch (error: any) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}

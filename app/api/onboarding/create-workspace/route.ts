import { NextResponse } from "next/server";

import { createWorkspace } from "@/lib/onboarding/create-workspace";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      businessName,
      ownerName,
      email,
      password,
    } = body;

    // Basic validation
    if (!businessName?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Business name is required.",
        },
        { status: 400 }
      );
    }

    if (!ownerName?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Owner name is required.",
        },
        { status: 400 }
      );
    }

    if (!email?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Email is required.",
        },
        { status: 400 }
      );
    }

    if (!password || password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          error: "Password must be at least 8 characters.",
        },
        { status: 400 }
      );
    }

    const workspace = await createWorkspace(body);

    return NextResponse.json(workspace);
  } catch (error: any) {
    console.error("Create workspace failed:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ??
          "Failed to create workspace.",
      },
      {
        status: 500,
      }
    );
  }
}
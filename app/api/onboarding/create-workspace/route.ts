import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      businessName,
      ownerName,
      email,
      phone,
      loyaltyType,
    } = body;

    if (!businessName || !ownerName || !email) {
      return NextResponse.json(
        {
          success: false,
          error: "Business name, owner name and email are required.",
        },
        {
          status: 400,
        }
      );
    }

    console.log("Workspace request:", body);

    return NextResponse.json({
      success: true,
      message: "Workspace request received.",
      body,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Invalid request.",
      },
      {
        status: 500,
      }
    );
  }
}
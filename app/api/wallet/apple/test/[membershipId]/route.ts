import { NextResponse } from "next/server";

import { buildWalletPass } from "@/lib/wallet/builder";
import { buildApplePass } from "@/lib/wallet/apple/pass";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ membershipId: string }>;
  }
) {
  const { membershipId } = await params;

  const model = await buildWalletPass(membershipId);

  if (!model) {
    return NextResponse.json(
      {
        success: false,
        message: "Membership not found",
      },
      {
        status: 404,
      }
    );
  }

  const pass = buildApplePass(model);

  return NextResponse.json({
    success: true,
    model,
    pass,
  });
}
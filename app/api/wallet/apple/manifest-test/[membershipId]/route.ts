import { NextResponse } from "next/server";

import { buildWalletPass } from "@/lib/wallet/builder";
import { buildApplePass } from "@/lib/wallet/apple/pass";
import { buildManifest } from "@/lib/wallet/apple/manifest";

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
      },
      {
        status: 404,
      }
    );
  }

  const pass = buildApplePass(model);

  const passJson = JSON.stringify(pass, null, 2);

  const manifest = buildManifest({
    "pass.json": passJson,
  });

  return NextResponse.json({
    pass,
    manifest,
  });
}
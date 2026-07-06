import { NextResponse } from "next/server";

import { buildWalletPass } from "@/lib/wallet/builder";
import { buildApplePass } from "@/lib/wallet/apple/pass";
import { buildManifest } from "@/lib/wallet/apple/manifest";
import { buildPkPass } from "@/lib/wallet/apple/zip";

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
    return new NextResponse("Membership not found", {
      status: 404,
    });
  }

  const pass = buildApplePass(model);

  const passJson = JSON.stringify(pass, null, 2);

  const manifest = buildManifest({
    "pass.json": passJson,
  });

  const pkpass = await buildPkPass({
    pass,
    manifest,
  });

  return new NextResponse(pkpass, {
    headers: {
      "Content-Type":
        "application/vnd.apple.pkpass",
      "Content-Disposition":
        'attachment; filename="SmartShopper.pkpass"',
    },
  });
}
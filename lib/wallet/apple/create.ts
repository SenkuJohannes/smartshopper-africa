import { buildWalletPass } from "../builder";
import { buildApplePass } from "./pass";

export interface ApplePassResult {
  success: boolean;
  pass?: object;
  message?: string;
}

export async function createApplePass(
  membershipId: string
): Promise<ApplePassResult> {
  const model = await buildWalletPass(membershipId);

  if (!model) {
    return {
      success: false,
      message: "Unable to build wallet model",
    };
  }

  const pass = buildApplePass(model);

  return {
    success: true,
    pass,
  };
}
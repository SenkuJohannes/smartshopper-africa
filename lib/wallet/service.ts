import { supabase } from "@/lib/supabase/client";

import "./providers/apple";
import "./providers/google";

import { getProviders } from "./providers";

export interface WalletSyncResult {
  success: boolean;
  updatedProviders: string[];
  failedProviders: string[];
  message?: string;
}

export async function syncMembership(
  membershipId: string
): Promise<WalletSyncResult> {
  const { data: membership, error } = await supabase
    .from("customer_memberships")
    .select(
      `
      *,
      customer:customers(*),
      program:programs(*),
      card:loyalty_cards(*)
    `
    )
    .eq("id", membershipId)
    .single();

  if (error || !membership) {
    return {
      success: false,
      updatedProviders: [],
      failedProviders: [],
      message: "Membership not found",
    };
  }

  const providers = getProviders();

  const updatedProviders: string[] = [];
  const failedProviders: string[] = [];

  for (const provider of providers) {
    try {
      const updated = await provider.updatePass(membership);

      if (updated) {
        updatedProviders.push(provider.name);
      } else {
        failedProviders.push(provider.name);
      }
    } catch (err) {
      console.error(`${provider.name} Wallet:`, err);
      failedProviders.push(provider.name);
    }
  }

  return {
    success: true,
    updatedProviders,
    failedProviders,
  };
}
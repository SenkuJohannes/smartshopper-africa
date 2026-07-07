import { supabaseAdmin } from "@/lib/supabase/admin";

/**
 * Find a customer's SmartShopper Network wallet.
 */
export async function findNetworkWallet(customerId: string) {
  const { data, error } = await supabaseAdmin
    .from("network_wallets")
    .select("*")
    .eq("customer_id", customerId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Create a SmartShopper Network wallet.
 */
export async function createNetworkWallet(customerId: string) {
  const { data, error } = await supabaseAdmin
    .from("network_wallets")
    .insert({
      customer_id: customerId,
      network_points: 0,
      lifetime_network_points: 0,
      tier: "Bronze",
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Ensure every customer has exactly one
 * SmartShopper Network wallet.
 */
export async function findOrCreateNetworkWallet(
  customerId: string
) {
  let wallet = await findNetworkWallet(customerId);

  if (!wallet) {
    wallet = await createNetworkWallet(customerId);
  }

  return wallet;
}
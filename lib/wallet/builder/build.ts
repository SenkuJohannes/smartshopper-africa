import { supabase } from "@/lib/supabase/client";
import { WalletPassModel } from "./types";

export async function buildWalletPass(
  membershipId: string
): Promise<WalletPassModel | null> {
  const { data: membership, error } = await supabase
    .from("customer_memberships")
    .select(`
      *,
      customer:customers(*),
      program:programs(*)
    `)
    .eq("id", membershipId)
    .single();

  if (error || !membership) {
    console.error("Membership:", error);
    return null;
  }

  const customer = membership.customer;
  const program = membership.program;

  if (!customer || !program) {
    console.error("Missing customer or program relation.");
    return null;
  }

  return {
    membershipId,

    business: {
      id: program.id,
      name: program.name,
      logo: program.logo_url,
      primaryColor: program.primary_color,
      secondaryColor: program.secondary_color,
    },

    customer: {
      firstName: customer.first_name,
      lastName: customer.last_name,
    },

    loyalty: {
      memberNumber: membership.member_number,
      points: membership.current_points ?? 0,
      visits: membership.visits_count ?? 0,
      tier: membership.tier ?? null,
    },

    rewards: {
      nextReward: null,
      remainingPoints: null,
    },

    qrCode: membership.card_number,
  };
}
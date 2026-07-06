import { supabase } from "@/lib/supabase/client";

type CreateMembershipProps = {
  customerId: string;
  programId: string;
};

export async function createMembership({
  customerId,
  programId,
}: CreateMembershipProps) {
  // Check if membership already exists
  const { data: existingMembership, error: lookupError } = await supabase
    .from("customer_memberships")
    .select("*")
    .eq("customer_id", customerId)
    .eq("program_id", programId)
    .maybeSingle();

  if (lookupError) {
    throw lookupError;
  }

  // Already a member
  if (existingMembership) {
    return existingMembership;
  }

  // Count memberships
  const { count, error: countError } = await supabase
    .from("customer_memberships")
    .select("*", {
      count: "exact",
      head: true,
    });

  if (countError) {
    throw countError;
  }

  const nextNumber = (count ?? 0) + 1;

  // Member Number
  const memberNumber = `MEM-${nextNumber
    .toString()
    .padStart(6, "0")}`;

  // Card Number
  const cardNumber = `CARD-${nextNumber
    .toString()
    .padStart(6, "0")}`;

  // Create membership
  const { data: membership, error } = await supabase
    .from("customer_memberships")
    .insert({
      customer_id: customerId,
      program_id: programId,

      member_number: memberNumber,
      card_number: cardNumber,

      current_points: 0,
      lifetime_points: 0,

      visits_count: 0,
      last_visit_at: null,

      status: "active",
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return membership;
}
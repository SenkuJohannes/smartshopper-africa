import { supabaseAdmin } from "@/lib/supabase/admin";
import { generateMemberNumber } from "./member-number";

export async function findMembership(
  customerId: string,
  programId: string
) {
  const { data, error } = await supabaseAdmin
    .from("customer_memberships")
    .select("*")
    .eq("customer_id", customerId)
    .eq("program_id", programId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

function generateCardNumber() {
  const random = Math.floor(
    100000 + Math.random() * 900000
  );

  return `CARD-${random}`;
}

export async function createMembership(
  customerId: string,
  programId: string
) {
  const memberNumber = await generateMemberNumber();

  const cardNumber = generateCardNumber();

  const { data, error } = await supabaseAdmin
    .from("customer_memberships")
    .insert({
      customer_id: customerId,

      program_id: programId,

      member_number: memberNumber,

      card_number: cardNumber,

      current_points: 0,

      lifetime_points: 0,

      visits_count: 0,

      status: "active",
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function findOrCreateMembership(
  customerId: string,
  programId: string
) {
  let membership = await findMembership(
    customerId,
    programId
  );

  if (!membership) {
    membership = await createMembership(
      customerId,
      programId
    );
  }

  return membership;
}
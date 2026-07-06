import { supabaseAdmin } from "@/lib/supabase/server";

/**
 * Generates a random SmartShopper member number.
 *
 * Example:
 * SM-TBN5Z7
 */
function randomMemberNumber(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  let code = "";

  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }

  return `SM-${code}`;
}

/**
 * Generates a unique member number.
 */
export async function generateMemberNumber(): Promise<string> {
  while (true) {
    const memberNumber = randomMemberNumber();

    const { data } = await supabaseAdmin
      .from("customer_memberships")
      .select("id")
      .eq("member_number", memberNumber)
      .maybeSingle();

    if (!data) {
      return memberNumber;
    }
  }
}
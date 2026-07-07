import { supabaseAdmin } from "@/lib/supabase/admin";

export async function createBusinessMember(
  businessId: string,
  profileId: string
) {
  const { error } = await supabaseAdmin
    .from("business_members")
    .insert({
      business_id: businessId,
      profile_id: profileId,
      role: "owner",
    });

  if (error) {
    throw error;
  }
}
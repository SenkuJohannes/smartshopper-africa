import { supabaseAdmin } from "@/lib/supabase/admin";

export type BusinessRole =
  | "owner"
  | "manager"
  | "staff";

export interface CreateBusinessMemberInput {
  businessId: string;
  profileId: string;
  role?: BusinessRole;
  invitedBy?: string | null;
}

export async function createBusinessMember({
  businessId,
  profileId,
  role = "owner",
  invitedBy = null,
}: CreateBusinessMemberInput) {
  const { data, error } = await supabaseAdmin
    .from("business_members")
    .insert({
      business_id: businessId,
      profile_id: profileId,
      role,
      invited_by: invitedBy,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
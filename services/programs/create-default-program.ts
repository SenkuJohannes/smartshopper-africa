import { supabaseAdmin } from "@/lib/supabase/server";

import { LoyaltyType } from "@/contexts/onboarding-context";

export interface CreateDefaultProgramInput {
  businessId: string;

  businessName: string;

  loyaltyType: LoyaltyType;

  joinCode: string;

  welcomeMessage: string;

  primaryColor: string;
  secondaryColor: string;

  website: string;
  phone: string;
  address: string;

  logoUrl?: string | null;
  bannerUrl?: string | null;

  startsAt?: string | null;
  endsAt?: string | null;

  termsUrl?: string | null;
}

export async function createDefaultProgram({
  businessId,
  businessName,
  loyaltyType,
  joinCode,
  welcomeMessage,
  primaryColor,
  secondaryColor,
  website,
  phone,
  address,
  logoUrl = null,
  bannerUrl = null,
  startsAt = null,
  endsAt = null,
  termsUrl = null,
}: CreateDefaultProgramInput) {
  const { data, error } = await supabaseAdmin
    .from("programs")
    .insert({
      business_id: businessId,

      name: `${businessName} Rewards`,

      description: welcomeMessage,

      program_type: loyaltyType,

      status: "active",

      logo_url: logoUrl,

      banner_url: bannerUrl,

      primary_color: primaryColor,

      secondary_color: secondaryColor,

      welcome_message: welcomeMessage,

      business_phone: phone,

      business_address: address,

      website,

      join_code: joinCode,

      is_public: true,

      starts_at: startsAt,

      ends_at: endsAt,

      terms_url: termsUrl,

      points: 0,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
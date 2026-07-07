import { supabaseAdmin } from "@/lib/supabase/admin";

type CreateProgramInput = {
  businessId: string;

  name: string;

  loyaltyType:
    | "points"
    | "visits"
    | "cashback"
    | "membership";

  primaryColor: string;
  secondaryColor: string;

  welcomeMessage: string;

  website: string;
  phone: string;
  address: string;
};

function generateJoinCode() {
  return Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();
}

export async function createProgram({
  businessId,
  name,
  loyaltyType,
  primaryColor,
  secondaryColor,
  welcomeMessage,
  website,
  phone,
  address,
}: CreateProgramInput) {
  const { data, error } = await supabaseAdmin
    .from("programs")
    .insert({
      business_id: businessId,

      name,

      program_type: loyaltyType,

      status: "active",

      join_code: generateJoinCode(),

      primary_color: primaryColor,
      secondary_color: secondaryColor,

      welcome_message: welcomeMessage,

      website,

      business_phone: phone,
      business_address: address,

      is_public: true,

      points_per_visit: 10,

      points_per_discount: 100,

      discount_per_step: 5,

      max_discount: 20,

      reward_product: "Free Product",

      allow_save_points: true,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
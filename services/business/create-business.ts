import { supabaseAdmin } from "@/lib/supabase/server";

interface CreateBusinessInput {
  name: string;
  email: string;
  phone: string;
  website: string;
  industry: string;
  country: string;
  currency: string;
  primaryColor: string;
  secondaryColor: string;
  subscription: string;
}

export async function createBusiness(
  input: CreateBusinessInput
) {
  const { data, error } = await supabaseAdmin
    .from("businesses")
    .insert({
      name: input.name,
      email: input.email,
      phone: input.phone,
      website: input.website,
      industry: input.industry,
      country: input.country,
      currency: input.currency,
      primary_color: input.primaryColor,
      secondary_color: input.secondaryColor,
      subscription: input.subscription,
      status: "active",
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
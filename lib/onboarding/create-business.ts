import { supabaseAdmin } from "@/lib/supabase/admin";

type CreateBusinessInput = {
  ownerId: string;

  businessName: string;
  email: string;
  phone: string;

  website: string;
  industry: string;

  country: string;
  currency: string;

  primaryColor: string;
  secondaryColor: string;
};

export async function createBusiness({
  ownerId,
  businessName,
  email,
  phone,
  website,
  industry,
  country,
  currency,
  primaryColor,
  secondaryColor,
}: CreateBusinessInput) {
  const slug =
  businessName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") +
  "-" +
  Math.random().toString(36).substring(2, 6);

  const { data, error } = await supabaseAdmin
    .from("businesses")
    .insert({
      owner_id: ownerId,

      name: businessName,
      email,
      phone,

      website,
      industry,

      country,
      currency,

      primary_color: primaryColor,
      secondary_color: secondaryColor,

      slug,

      subscription: "trial",

      status: "active",
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
import { supabase } from "@/lib/supabase/client";

export async function createCustomer({
  firstName,
  lastName,
  email,
  phone,
}: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}) {
  // Check if customer already exists
  const { data: existingCustomer, error: lookupError } = await supabase
    .from("customers")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (lookupError) {
    throw lookupError;
  }

  if (existingCustomer) {
    return existingCustomer;
  }

  // Create new customer
  const { data: customer, error } = await supabase
    .from("customers")
    .insert({
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return customer;
}
import { supabaseAdmin } from "@/lib/supabase/admin";

export interface CustomerInput {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string | null;
}

/**
 * Find a customer by phone number.
 */
export async function findCustomerByPhone(phone: string) {
  const { data, error } = await supabaseAdmin
    .from("customers")
    .select("*")
    .eq("phone", phone)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Create a new SmartShopper customer.
 */
export async function createCustomer(input: CustomerInput) {
  const { data, error } = await supabaseAdmin
    .from("customers")
    .insert({
      first_name: input.firstName,
      last_name: input.lastName,
      phone: input.phone,
      email: input.email ?? null,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Find the customer by phone.
 * If they don't exist, create them.
 */
export async function findOrCreateCustomer(
  input: CustomerInput
) {
  let customer = await findCustomerByPhone(input.phone);

  if (!customer) {
    customer = await createCustomer(input);
  }

  return customer;
}
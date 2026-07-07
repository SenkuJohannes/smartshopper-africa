import { supabaseAdmin } from "@/lib/supabase/admin";

import {
  findOrCreateCustomer,
  CustomerInput,
} from "@/lib/customers/service";

import { findOrCreateNetworkWallet } from "@/lib/network/wallet";

import {
  findMembership,
  createMembership,
} from "@/lib/membership/service";

export interface RegisterMemberInput extends CustomerInput {
  programId: string;
}

export async function registerCustomer(
  input: RegisterMemberInput
) {
  // 1. Make sure the loyalty program exists
  const { data: program, error: programError } =
    await supabaseAdmin
      .from("programs")
      .select("*")
      .eq("id", input.programId)
      .single();

  if (programError || !program) {
    throw new Error("Program not found.");
  }

  // 2. Find or create the SmartShopper customer
  const customer = await findOrCreateCustomer({
    firstName: input.firstName,
    lastName: input.lastName,
    phone: input.phone,
    email: input.email,
  });

  // 3. Ensure the customer has a SmartShopper Network wallet
  const networkWallet =
    await findOrCreateNetworkWallet(customer.id);

  // 4. Check if they already belong to this business
  let membership = await findMembership(
    customer.id,
    program.id
  );

  let existing = true;

  if (!membership) {
    existing = false;

    membership = await createMembership(
      customer.id,
      program.id
    );
  }

  // 5. Return everything needed by the UI
  return {
    success: true,

    existing,

    program,

    customer,

    membership,

    networkWallet,
  };
}
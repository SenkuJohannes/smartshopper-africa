import { supabaseAdmin } from "@/lib/supabase/admin";

type CreateScannerInput = {
  businessId: string;
  programId: string;
};

function generateScannerCode() {
  return (
    "SCN-" +
    Math.random()
      .toString(36)
      .substring(2, 10)
      .toUpperCase()
  );
}

export async function createScanner({
  businessId,
  programId,
}: CreateScannerInput) {
  const { data, error } = await supabaseAdmin
    .from("scanners")
    .insert({
      business_id: businessId,
      program_id: programId,

      name: "Main Cashier",

      pairing_code: generateScannerCode(),

      status: "active",
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
import { supabase } from "@/lib/supabase/client";

type CreateCardProps = {
  customerId: string;
  programId: string;
};

export async function createCard({
  customerId,
  programId,
}: CreateCardProps) {
  // Check if the customer already has a card
  const { data: existingCard, error: lookupError } = await supabase
    .from("loyalty_cards")
    .select("*")
    .eq("customer_id", customerId)
    .eq("program_id", programId)
    .maybeSingle();

  if (lookupError) {
    throw lookupError;
  }

  // Return existing card
  if (existingCard) {
    return existingCard;
  }

  // Count cards
  const { count, error: countError } = await supabase
    .from("loyalty_cards")
    .select("*", {
      count: "exact",
      head: true,
    });

  if (countError) {
    throw countError;
  }

  const nextNumber = (count ?? 0) + 1;

  const cardNumber = `CARD-${nextNumber
    .toString()
    .padStart(6, "0")}`;

  const qrCode = cardNumber;

  // Create new card
  const { data: card, error } = await supabase
    .from("loyalty_cards")
    .insert({
      customer_id: customerId,
      program_id: programId,
      card_number: cardNumber,
      qr_code: qrCode,
      status: "active",
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return card;
}
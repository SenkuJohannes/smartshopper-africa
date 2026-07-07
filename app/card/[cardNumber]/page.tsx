import { supabase } from "@/lib/supabase/client";
import LoyaltyCardHeader from "@/components/loyalty-card/loyalty-card-header";
import LoyaltyCardPoints from "@/components/loyalty-card/loyalty-card-points";
import LoyaltyCardQr from "@/components/loyalty-card/loyalty-card-qr";
import LoyaltyCardFooter from "@/components/loyalty-card/loyalty-card-footer";

export default async function CardPage({
  params,
}: {
  params: Promise<{ cardNumber: string }>;
}) {
  const { cardNumber } = await params;

  const { data: card, error } = await supabase
    .from("loyalty_cards")
    .select(`
      *,
      customer:customers(*),
      program:programs(*)
    `)
    .eq("card_number", cardNumber)
    .single();

  if (error || !card) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          Loyalty Card Not Found
        </h1>
      </main>
    );
  }

  // Load membership to get the live points balance
  const { data: membership } = await supabase
    .from("customer_memberships")
    .select("*")
    .eq("customer_id", card.customer_id)
    .eq("program_id", card.program_id)
    .single();

  return (
    <main className="min-h-screen bg-slate-100 p-10 flex justify-center">
      <div className="w-full max-w-md space-y-6">

        <LoyaltyCardHeader
  program={card.program}
  customer={card.customer}
  membership={membership}
/>

        <LoyaltyCardPoints
          points={membership?.current_points ?? 0}
        />

        <LoyaltyCardQr
          cardNumber={card.card_number}
          memberNumber={membership?.member_number}
        />

        <LoyaltyCardFooter
          program={card.program}
        />

      </div>
    </main>
  );
}
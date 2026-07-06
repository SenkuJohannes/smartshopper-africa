import { supabase } from "@/lib/supabase/client";
import LoyaltyCard from "@/components/loyalty-card/loyalty-card";

export default async function MemberCard({
  params,
}: {
  params: Promise<{ memberNumber: string }>;
}) {
  const { memberNumber } = await params;

  // Load membership
  const { data: membership, error: membershipError } = await supabase
    .from("customer_memberships")
    .select("*")
    .eq("member_number", memberNumber)
    .single();

  if (membershipError || !membership) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
          <h1 className="text-3xl font-bold">
            Membership Not Found
          </h1>

          <p className="text-gray-500 mt-3">
            This loyalty card doesn't exist.
          </p>
        </div>
      </main>
    );
  }

  // Load customer
  const { data: customer } = await supabase
    .from("customers")
    .select("*")
    .eq("id", membership.customer_id)
    .single();

  // Load program
  const { data: program } = await supabase
    .from("programs")
    .select("*")
    .eq("id", membership.program_id)
    .single();

  // Load recent activity
  const { data: transactions } = await supabase
    .from("loyalty_transactions")
    .select("*")
    .eq("membership_id", membership.id)
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <main className="min-h-screen bg-slate-100 py-10 px-4">

      <LoyaltyCard
        program={program}
        membership={membership}
        customer={customer}
        activities={transactions ?? []}
      />

    </main>
  );
}
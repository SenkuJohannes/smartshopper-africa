import { supabase } from "@/lib/supabase/client";

export default async function ScannerMemberPage({
  params,
}: {
  params: Promise<{ memberNumber: string }>;
}) {
  const { memberNumber } = await params;

  const { data: membership } = await supabase
    .from("customer_memberships")
    .select(`
      *,
      customers (*),
      programs (*)
    `)
    .eq("member_number", memberNumber)
    .single();

  if (!membership) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="bg-white rounded-2xl shadow-xl p-10">
          <h1 className="text-3xl font-bold text-red-600">
            Member Not Found
          </h1>
        </div>
      </main>
    );
  }

  const customer = membership.customers;
  const program = membership.programs;

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-8">

      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-xl">

        <h1 className="text-3xl font-bold mb-6">
          Customer Found
        </h1>

        <div className="space-y-4">

          <div>
            <strong>Name</strong>
            <p>
              {customer.first_name} {customer.last_name}
            </p>
          </div>

          <div>
            <strong>Program</strong>
            <p>{program.name}</p>
          </div>

          <div>
            <strong>Member Number</strong>
            <p>{membership.member_number}</p>
          </div>

          <div>
            <strong>Current Points</strong>

            <p className="text-5xl font-bold text-green-600 mt-2">
              {membership.current_points}
            </p>
          </div>

        </div>

        <button
          className="mt-10 w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-4 text-xl font-bold"
        >
          +10 Points
        </button>

      </div>

    </main>
  );
}
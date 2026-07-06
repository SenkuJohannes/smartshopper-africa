import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export default async function CustomersPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: memberships } = await supabase
    .from("customer_memberships")
    .select(`
      *,
      customers (
        first_name,
        last_name,
        email,
        phone
      )
    `)
    .eq("program_id", id)
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-slate-100 p-8">

      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-4xl font-bold">
            Customers
          </h1>

          <p className="text-gray-500">
            Manage members in this loyalty program.
          </p>
        </div>

      </div>

      <div className="space-y-6">

        {memberships?.map((membership) => {

          const customer = Array.isArray(membership.customers)
            ? membership.customers[0]
            : membership.customers;

          return (

            <div
              key={membership.id}
              className="bg-white rounded-2xl shadow p-6 flex justify-between items-center"
            >

              <div>

                <h2 className="text-xl font-bold">
                  {customer?.first_name} {customer?.last_name}
                </h2>

                <p className="text-gray-500 mt-1">
                  {customer?.email}
                </p>

                <p className="text-gray-500">
                  {customer?.phone}
                </p>

                <div className="flex flex-wrap gap-6 mt-4 text-sm">

                  <span>
                    ⭐ {membership.current_points} Points
                  </span>

                  <span>
                    🏆 {membership.lifetime_points} Lifetime
                  </span>

                  <span>
                    ☕ {membership.visits_count} Visits
                  </span>

                  <span>
                    👤 {membership.member_number}
                  </span>

                  <span>
                    💳 {membership.card_number}
                  </span>

                </div>

              </div>

              <div className="flex gap-3">

                <Link
                  href={`/member/${membership.member_number}`}
                  className="px-4 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-800"
                >
                  View Card
                </Link>

                <Link
                  href={`/staff/scan`}
                  className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                >
                  Award Points
                </Link>

              </div>

            </div>

          );

        })}

        {memberships?.length === 0 && (

          <div className="bg-white rounded-2xl shadow p-12 text-center">

            <h2 className="text-2xl font-bold">
              No Members Yet
            </h2>

            <p className="text-gray-500 mt-3">
              Customers will appear here once they join the loyalty program.
            </p>

          </div>

        )}

      </div>

    </main>
  );
}
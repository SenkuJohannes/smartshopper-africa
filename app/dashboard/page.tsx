import { createSupabaseServerClient } from "@/lib/supabase/server";
import StatCard from "@/components/dashboard/stat-card";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // --------------------------------------------------
  // Load Business
  // --------------------------------------------------

  const { data: business } = await supabase
    .from("businesses")
    .select("*")
    .eq("owner_id", user.id)
    .single();

  if (!business) {
    return (
      <div className="rounded-3xl bg-white p-10 shadow-sm">
        <h2 className="text-3xl font-bold">
          Welcome 👋
        </h2>

        <p className="mt-4 text-slate-500">
          No business found.
        </p>
      </div>
    );
  }

  // --------------------------------------------------
  // Load Program
  // --------------------------------------------------

  const { data: program } = await supabase
    .from("programs")
    .select("id")
    .eq("business_id", business.id)
    .single();

  if (!program) {
    return (
      <div className="rounded-3xl bg-white p-10 shadow-sm">
        <h2 className="text-3xl font-bold">
          {business.name}
        </h2>

        <p className="mt-4 text-slate-500">
          Create your first loyalty program.
        </p>
      </div>
    );
  }

  // --------------------------------------------------
  // Members
  // --------------------------------------------------

  const { count: members } = await supabase
    .from("customer_memberships")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("program_id", program.id);

  // --------------------------------------------------
  // Memberships
  // --------------------------------------------------

  const { data: memberships } = await supabase
    .from("customer_memberships")
    .select("id, member_number")
    .eq("program_id", program.id);

  const membershipIds =
    memberships?.map((m) => m.id) ?? [];

  let visits = 0;
  let pointsIssued = 0;
  let rewardsRedeemed = 0;
  let recentActivity: any[] = [];

  if (membershipIds.length > 0) {
    const { data: transactions } = await supabase
      .from("loyalty_transactions")
      .select("*")
      .in("membership_id", membershipIds)
      .order("created_at", {
        ascending: false,
      });

    recentActivity =
      transactions?.map((transaction) => ({
        ...transaction,
        member:
          memberships?.find(
            (m) => m.id === transaction.membership_id
          )?.member_number ?? "Unknown Member",
      })) ?? [];

    visits =
      transactions?.filter(
        (t) => t.transaction_type === "earn"
      ).length ?? 0;

    rewardsRedeemed =
      transactions?.filter(
        (t) => t.transaction_type === "redeem"
      ).length ?? 0;

    pointsIssued =
      transactions
        ?.filter(
          (t) => t.transaction_type === "earn"
        )
        .reduce(
          (sum, t) => sum + t.points,
          0
        ) ?? 0;
  }

  return (
    <>
      {/* Welcome */}

      <div className="mb-8 rounded-3xl bg-white p-8 shadow-sm">

        <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
          Welcome Back 👋
        </p>

        <h1 className="mt-2 text-4xl font-black">
          {business.name}
        </h1>

        <p className="mt-3 text-slate-500">
          Here's what's happening in your loyalty program today.
        </p>

      </div>

      {/* KPI Cards */}

      <div className="mb-8 grid grid-cols-4 gap-6">

        <StatCard
          title="Members"
          value={members ?? 0}
        />

        <StatCard
          title="Visits"
          value={visits}
        />

        <StatCard
          title="Points Issued"
          value={pointsIssued}
        />

        <StatCard
          title="Rewards Redeemed"
          value={rewardsRedeemed}
        />

      </div>

      {/* Recent Activity */}

      <div className="rounded-3xl bg-white p-8 shadow-sm">

        <div className="mb-6">

          <h2 className="text-2xl font-bold">
            Recent Activity
          </h2>

          <p className="mt-2 text-slate-500">
            Latest loyalty transactions.
          </p>

        </div>

        <div className="space-y-4">

          {recentActivity.length === 0 ? (

            <div className="rounded-2xl border-2 border-dashed border-slate-200 py-16 text-center">

              <div className="text-5xl">
                ☕
              </div>

              <h3 className="mt-4 text-xl font-bold">
                No activity yet
              </h3>

              <p className="mt-2 text-slate-500">
                Start scanning customers to see activity here.
              </p>

            </div>

          ) : (

            recentActivity.slice(0, 10).map((item) => (

              <div
                key={item.id}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 transition hover:bg-slate-50"
              >

                <div>

                  <h3 className="text-lg font-bold">
                    {item.member}
                  </h3>

                  <p className="mt-1 text-slate-500">

                    {item.transaction_type === "earn"
                      ? `⭐ Earned ${item.points} points`
                      : item.transaction_type === "redeem"
                      ? `🎁 Redeemed ${Math.abs(item.points)} points`
                      : `${item.transaction_type} (${item.points} pts)`}

                  </p>

                </div>

                <div className="text-right">

                  <p className="font-semibold">
                    Balance: {item.balance_after}
                  </p>

                  <p className="text-sm text-slate-400">
                    {new Date(item.created_at).toLocaleString()}
                  </p>

                </div>

              </div>

            ))

          )}

        </div>

      </div>
    </>
  );
}
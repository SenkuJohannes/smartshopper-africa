import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import StatCard from "@/components/dashboard/stat-card";

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: program } = await supabase
    .from("programs")
    .select("*")
    .eq("id", id)
    .single();

  const { count: members } = await supabase
    .from("customer_memberships")
    .select("*", { count: "exact", head: true })
    .eq("program_id", id);

  const { count: rewards } = await supabase
    .from("reward_definitions")
    .select("*", { count: "exact", head: true })
    .eq("program_id", id);

  const { data: memberships } = await supabase
    .from("customer_memberships")
    .select("current_points, lifetime_points, visits_count")
    .eq("program_id", id);

  const totalPoints =
    memberships?.reduce(
      (sum, member) => sum + (member.current_points ?? 0),
      0
    ) ?? 0;

  const totalVisits =
    memberships?.reduce(
      (sum, member) => sum + (member.visits_count ?? 0),
      0
    ) ?? 0;

  const { data: recentActivity } = await supabase
    .from("loyalty_transactions")
    .select("description, points, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <main className="min-h-screen bg-slate-100 p-8">

      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          {program?.name}
        </h1>

        <p className="text-gray-500 mt-2">
          {program?.description}
        </p>
      </div>

      {/* KPI Cards */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Members"
          value={members ?? 0}
          icon="👥"
        />

        <StatCard
          title="Points Issued"
          value={totalPoints}
          icon="⭐"
        />

        <StatCard
          title="Visits"
          value={totalVisits}
          icon="☕"
        />

        <StatCard
          title="Rewards"
          value={rewards ?? 0}
          icon="🎁"
        />

      </div>

      {/* Quick Actions */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

        <Link
          href={`/dashboard/programs/${id}/customers`}
          className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-bold">
            👥 Customers
          </h2>

          <p className="text-gray-500 mt-2">
            View and manage members.
          </p>
        </Link>

        <Link
          href={`/dashboard/programs/${id}/rewards`}
          className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-bold">
            🎁 Rewards
          </h2>

          <p className="text-gray-500 mt-2">
            Manage customer rewards.
          </p>
        </Link>

        <Link
          href={`/dashboard/programs/${id}/campaigns`}
          className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-bold">
            📣 Campaigns
          </h2>

          <p className="text-gray-500 mt-2">
            Create marketing campaigns.
          </p>
        </Link>

        <Link
          href={`/dashboard/programs/${id}/transactions`}
          className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-bold">
            📈 Transactions
          </h2>

          <p className="text-gray-500 mt-2">
            View loyalty history.
          </p>
        </Link>

      </div>

      {/* Recent Activity */}

      <div className="bg-white rounded-2xl shadow p-8 mt-10">

        <h2 className="text-2xl font-bold mb-6">
          🔥 Recent Activity
        </h2>

        <div className="space-y-4">

          {recentActivity?.length ? (
            recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex justify-between border-b pb-3"
              >
                <div>
                  <p className="font-semibold">
                    {activity.description}
                  </p>

                  <p className="text-gray-500 text-sm">
                    {new Date(activity.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="font-bold text-green-600">
                  +{activity.points}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              No activity yet.
            </p>
          )}

        </div>

      </div>

    </main>
  );
}
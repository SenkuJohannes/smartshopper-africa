import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import StatCard from "@/components/dashboard/stat-card";

import {
  Users,
  Star,
  Coffee,
  Gift,
} from "lucide-react";

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

        <p className="mt-2 text-gray-500">
          {program?.description}
        </p>
      </div>

      {/* KPI Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Members"
          value={members ?? 0}
          icon={Users}
        />

        <StatCard
          title="Points Issued"
          value={totalPoints}
          icon={Star}
        />

        <StatCard
          title="Visits"
          value={totalVisits}
          icon={Coffee}
        />

        <StatCard
          title="Rewards"
          value={rewards ?? 0}
          icon={Gift}
        />

      </div>

      {/* Quick Actions */}

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <Link
          href={`/dashboard/programs/${id}/customers`}
          className="rounded-2xl bg-white p-6 shadow transition hover:shadow-lg"
        >
          <h2 className="text-xl font-bold">
            👥 Customers
          </h2>

          <p className="mt-2 text-gray-500">
            View and manage members.
          </p>
        </Link>

        <Link
          href={`/dashboard/programs/${id}/rewards`}
          className="rounded-2xl bg-white p-6 shadow transition hover:shadow-lg"
        >
          <h2 className="text-xl font-bold">
            🎁 Rewards
          </h2>

          <p className="mt-2 text-gray-500">
            Manage customer rewards.
          </p>
        </Link>

        <Link
          href={`/dashboard/programs/${id}/campaigns`}
          className="rounded-2xl bg-white p-6 shadow transition hover:shadow-lg"
        >
          <h2 className="text-xl font-bold">
            📣 Campaigns
          </h2>

          <p className="mt-2 text-gray-500">
            Create marketing campaigns.
          </p>
        </Link>

        <Link
          href={`/dashboard/programs/${id}/transactions`}
          className="rounded-2xl bg-white p-6 shadow transition hover:shadow-lg"
        >
          <h2 className="text-xl font-bold">
            📈 Transactions
          </h2>

          <p className="mt-2 text-gray-500">
            View loyalty history.
          </p>
        </Link>

      </div>

      {/* Recent Activity */}

      <div className="mt-10 rounded-2xl bg-white p-8 shadow">

        <h2 className="mb-6 text-2xl font-bold">
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

                  <p className="text-sm text-gray-500">
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
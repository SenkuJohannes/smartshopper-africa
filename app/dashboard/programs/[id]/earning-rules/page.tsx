import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export default async function RulesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: earnRules } = await supabase
    .from("earning_rules")
    .select("*")
    .eq("program_id", id)
    .order("created_at");

  const { data: rewardRules } = await supabase
    .from("reward_definitions")
    .select("*")
    .eq("program_id", id)
    .order("created_at");

  return (
    <main>

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Rules Engine
          </h1>

          <p className="mt-2 text-gray-500">
            Configure how customers earn points, redeem rewards and receive offers.
          </p>

        </div>

        <Link
  href={`/dashboard/programs/${id}/earning-rules/create`}
  className="rounded-xl bg-green-600 px-6 py-3 text-white hover:bg-green-700"
>
  + Create Rule
</Link>

      </div>

      {/* Dashboard Cards */}

      <div className="mb-10 grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl bg-white p-6 shadow">

          <p className="text-gray-500">
            Earn Rules
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            {earnRules?.length ?? 0}
          </h2>

          <p className="mt-3 text-sm text-gray-500">
            Rules that award points.
          </p>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow">

          <p className="text-gray-500">
            Reward Rules
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            {rewardRules?.length ?? 0}
          </h2>

          <p className="mt-3 text-sm text-gray-500">
            Rewards customers can redeem.
          </p>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow">

          <p className="text-gray-500">
            Offer Rules
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Coming Soon
          </h2>

          <p className="mt-3 text-sm text-gray-500">
            Promotions and special offers.
          </p>

        </div>

      </div>

      {/* Earn Rules */}

      <section className="mb-12">

        <h2 className="mb-6 text-2xl font-bold">
          🟢 Earn Rules
        </h2>

        <div className="space-y-5">

          {earnRules?.map((rule) => (

            <div
              key={rule.id}
              className="rounded-2xl bg-white p-6 shadow"
            >

              <div className="flex items-center justify-between">

                <h3 className="text-xl font-bold">
                  {rule.name}
                </h3>

                <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">
                  {rule.active ? "Active" : "Inactive"}
                </span>

              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-4">

                <div>

                  <strong>Type</strong>

                  <p>{rule.rule_type}</p>

                </div>

                <div>

                  <strong>Points</strong>

                  <p>{rule.points}</p>

                </div>

                <div>

                  <strong>Minimum Spend</strong>

                  <p>R {rule.minimum_purchase ?? 0}</p>

                </div>

                <div>

                  <strong>Status</strong>

                  <p>
                    {rule.active ? "Enabled" : "Disabled"}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* Reward Rules */}

      <section>

        <h2 className="mb-6 text-2xl font-bold">
          🎁 Reward Rules
        </h2>

        <div className="space-y-5">

          {rewardRules?.map((reward) => (

            <div
              key={reward.id}
              className="rounded-2xl bg-white p-6 shadow"
            >

              <div className="flex items-center justify-between">

                <h3 className="text-xl font-bold">
                  {reward.title}
                </h3>

                <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
                  {reward.points_required} Points
                </span>

              </div>

              <p className="mt-4 text-gray-500">
                {reward.description}
              </p>

            </div>

          ))}

          {rewardRules?.length === 0 && (

            <div className="rounded-2xl bg-white p-10 text-center shadow">

              <h3 className="text-2xl font-bold">
                No Reward Rules
              </h3>

              <p className="mt-3 text-gray-500">
                Create rewards your customers can redeem.
              </p>

            </div>

          )}

        </div>

      </section>

    </main>
  );
}
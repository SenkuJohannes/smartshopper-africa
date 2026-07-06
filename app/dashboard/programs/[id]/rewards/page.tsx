import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import MilestoneCard from "@/components/rewards/MilestoneCard";

import { Gift, Trophy, Award } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export default async function RewardsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: milestones } = await supabase
    .from("reward_rules")
    .select("*")
    .eq("program_id", id)
    .order("points_required", {
      ascending: true,
    });

  const activeRewards =
    milestones?.filter((m) => m.active).length ?? 0;

  const averageUnlock =
    milestones?.length
      ? Math.round(
          milestones.reduce(
            (sum, m) => sum + m.points_required,
            0
          ) / milestones.length
        )
      : 0;

  return (
    <main className="min-h-screen bg-slate-100 p-8">

      <PageHeader
        title="Rewards"
        description="Customers unlock these rewards as they collect points."
        buttonLabel="Add Milestone"
        buttonHref={`/dashboard/programs/${id}/rewards/create`}
      />

      {/* Statistics */}

      <div className="mb-10 grid gap-6 md:grid-cols-3">

        <StatCard
          title="Active Rewards"
          value={activeRewards}
          description="Currently available"
          icon={<Gift size={24} />}
          color="green"
        />

        <StatCard
          title="Reward Milestones"
          value={milestones?.length ?? 0}
          description="Configured rewards"
          icon={<Trophy size={24} />}
          color="blue"
        />

        <StatCard
          title="Average Unlock"
          value={`${averageUnlock} pts`}
          description="Average milestone"
          icon={<Award size={24} />}
          color="orange"
        />

      </div>

      {/* Rewards */}

      {milestones?.length ? (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {milestones.map((milestone) => (

            <MilestoneCard
              key={milestone.id}
              title={milestone.title}
              points={milestone.points_required}
              reward={milestone.reward_name ?? ""}
              rewardType={milestone.reward_type}
              active={milestone.active}
            />

          ))}

        </div>

      ) : (

        <div className="rounded-3xl bg-white p-16 text-center shadow-sm">

          <Gift
            size={60}
            className="mx-auto text-green-600"
          />

          <h2 className="mt-6 text-3xl font-bold">
            No Reward Milestones
          </h2>

          <p className="mt-3 text-gray-500">
            Customers don't have any rewards to unlock yet.
          </p>

        </div>

      )}

    </main>
  );
}
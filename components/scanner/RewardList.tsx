"use client";

import { useState } from "react";
import RewardCouponCard from "./RewardCouponCard";

interface RewardListProps {
  rewards: any[];
  nextReward?: any;
  pointsRemaining?: number;
}

export default function RewardList({
  rewards: initialRewards,
  nextReward,
  pointsRemaining,
}: RewardListProps) {
  const [rewards, setRewards] = useState(initialRewards);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function redeemReward(unlockId: string) {
    const confirmed = window.confirm(
      "Redeem this reward now?"
    );

    if (!confirmed) return;

    try {
      setLoadingId(unlockId);

      const response = await fetch("/api/redeem-reward", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          unlockId,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error);
        setLoadingId(null);
        return;
      }

      setRewards((prev) =>
        prev.filter((reward) => reward.id !== unlockId)
      );

      alert("✅ Reward redeemed successfully!");

    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="mt-8">

      <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
        🎁 Available Rewards
      </h2>

      {rewards.length ? (

        <div className="space-y-5">

          {rewards.map((reward) => (

            <RewardCouponCard
              key={reward.id}
              title={reward.title}
              reward={reward.reward_name}
              loading={loadingId === reward.id}
              onRedeem={() =>
                redeemReward(reward.id)
              }
            />

          ))}

        </div>

      ) : (

        <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">

          <div className="text-5xl">
            🎉
          </div>

          <h3 className="mt-4 text-xl font-bold">
            No Rewards Available
          </h3>

          <p className="mt-2 text-gray-500">
            All unlocked rewards have been redeemed.
          </p>

        </div>

      )}

      {nextReward && (

        <div className="mt-10 rounded-3xl border border-blue-200 bg-blue-50 p-6">

          <h2 className="flex items-center gap-2 text-xl font-bold">
            ⭐ Next Reward
          </h2>

          <div className="mt-5">

            <h3 className="text-2xl font-bold">
              {nextReward.title}
            </h3>

            <p className="mt-2 text-gray-600">
              Unlocks at{" "}
              <strong>
                {nextReward.points_required} Points
              </strong>
            </p>

            <div className="mt-6">

              <div className="mb-2 flex justify-between text-sm text-gray-600">

                <span>Progress</span>

                <span>
                  {pointsRemaining} pts remaining
                </span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-white">

                <div
                  className="h-full rounded-full bg-green-600 transition-all"
                  style={{
                    width: `${
                      Math.max(
                        0,
                        Math.min(
                          100,
                          ((nextReward.points_required -
                            pointsRemaining) /
                            nextReward.points_required) *
                            100
                        )
                      )
                    }%`,
                  }}
                />

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}
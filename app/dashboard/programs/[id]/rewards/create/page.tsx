"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function CreateRewardPage() {
  const params = useParams();
  const router = useRouter();

  const programId = params.id as string;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pointsRequired, setPointsRequired] = useState(100);

  // Database expects: free_item | discount | voucher | gift
  const [rewardType, setRewardType] = useState("free_item");

  const [loading, setLoading] = useState(false);

  async function createReward() {
    setLoading(true);

    const { error } = await supabase
      .from("reward_definitions")
      .insert({
        program_id: programId,
        title,
        description,
        points_required: pointsRequired,
        reward_type: rewardType,
      });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Reward created successfully!");

    router.push(`/dashboard/programs/${programId}/rewards`);
  }

  return (
    <main className="bg-slate-100 min-h-screen p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-10">
        <h1 className="text-4xl font-bold mb-2">
          Create Reward
        </h1>

        <p className="text-gray-500 mb-10">
          Add a reward customers can redeem.
        </p>

        <div className="space-y-6">
          <input
            className="w-full border rounded-xl p-4"
            placeholder="Reward Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full border rounded-xl p-4 h-32"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            className="w-full border rounded-xl p-4"
            value={rewardType}
            onChange={(e) => setRewardType(e.target.value)}
          >
            <option value="free_item">Free Item</option>
            <option value="discount">Discount</option>
            <option value="voucher">Voucher</option>
            <option value="gift">Gift</option>
          </select>

          <input
            type="number"
            className="w-full border rounded-xl p-4"
            placeholder="Points Required"
            value={pointsRequired}
            onChange={(e) =>
              setPointsRequired(Number(e.target.value))
            }
          />

          <button
            onClick={createReward}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-4 font-bold transition"
          >
            {loading ? "Creating..." : "Create Reward"}
          </button>
        </div>
      </div>
    </main>
  );
}
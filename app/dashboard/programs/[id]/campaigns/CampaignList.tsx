"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import {
  Pencil,
  Trash2,
  Calendar,
  Target,
  Star,
} from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  description: string;
  campaign_type: string;
  bonus_points: number;
  starts_at: string;
  ends_at: string;
  active: boolean;
}

export default function CampaignList({
  campaigns: initialCampaigns,
  programId,
}: {
  campaigns: Campaign[];
  programId: string;
}) {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const router = useRouter();

  async function deleteCampaign(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this campaign?"
    );

    if (!confirmed) return;

    setDeletingId(id);

    const { error } = await supabase
      .from("campaigns")
      .delete()
      .eq("id", id);

    setDeletingId(null);

    if (error) {
      alert(error.message);
      return;
    }

    setCampaigns((prev) => prev.filter((c) => c.id !== id));

    router.refresh();
  }

  if (campaigns.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow p-12 text-center">
        <h2 className="text-2xl font-bold">
          No Campaigns Yet
        </h2>

        <p className="text-gray-500 mt-3">
          Campaigns let you reward customers during special promotions.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {campaigns.map((campaign) => (
        <div
          key={campaign.id}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex justify-between items-center"
        >
          <div className="flex-1">
            <h2 className="text-2xl font-bold">
              {campaign.name}
            </h2>

            <p className="text-gray-500 mt-2">
              {campaign.description}
            </p>

            <div className="flex flex-wrap gap-6 mt-5 text-sm text-gray-700">
              <span className="flex items-center gap-2">
                <Target size={16} />
                {campaign.campaign_type}
              </span>

              <span className="flex items-center gap-2">
                <Star size={16} />
                Bonus {campaign.bonus_points} pts
              </span>

              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {campaign.starts_at?.slice(0, 10)} →{" "}
                {campaign.ends_at?.slice(0, 10)}
              </span>

              <span
                className={
                  campaign.active
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                {campaign.active
                  ? "🟢 Active"
                  : "🔴 Inactive"}
              </span>
            </div>
          </div>

          <div className="flex gap-3 ml-6">
            <Link
              href={`/dashboard/programs/${programId}/campaigns/${campaign.id}/edit`}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              <Pencil size={18} />
              Edit
            </Link>

            <button
              onClick={() => deleteCampaign(campaign.id)}
              disabled={deletingId === campaign.id}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white px-4 py-2 rounded-lg transition"
            >
              <Trash2 size={18} />

              {deletingId === campaign.id
                ? "Deleting..."
                : "Delete"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
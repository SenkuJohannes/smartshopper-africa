"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function EditCampaignPage() {
  const router = useRouter();

  const params = useParams();

  const programId = params.id as string;
  const campaignId = params.campaignId as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [campaignType, setCampaignType] = useState("promotion");
  const [bonusPoints, setBonusPoints] = useState(0);
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const [active, setActive] = useState(true);

  useEffect(() => {
    loadCampaign();
  }, []);

  async function loadCampaign() {
    const { data, error } = await supabase
      .from("campaigns")
      .select("*")
      .eq("id", campaignId)
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    setName(data.name);
    setDescription(data.description);
    setCampaignType(data.campaign_type);
    setBonusPoints(data.bonus_points);
    setStartsAt(data.starts_at?.slice(0, 10));
    setEndsAt(data.ends_at?.slice(0, 10));
    setActive(data.active);

    setLoading(false);
  }

  async function saveCampaign() {
    setSaving(true);

    const { error } = await supabase
      .from("campaigns")
      .update({
        name,
        description,
        campaign_type: campaignType,
        bonus_points: bonusPoints,
        starts_at: startsAt,
        ends_at: endsAt,
        active,
      })
      .eq("id", campaignId);

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Campaign updated!");

    router.push(
      `/dashboard/programs/${programId}/campaigns`
    );

    router.refresh();
  }

  if (loading) {
    return (
      <main className="p-10">
        Loading campaign...
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto py-10">

      <h1 className="text-4xl font-bold mb-8">
        Edit Campaign
      </h1>

      <div className="bg-white rounded-2xl shadow p-8 space-y-6">

        <div>
          <label className="font-semibold">
            Campaign Name
          </label>

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">
            Campaign Type
          </label>

          <select
            value={campaignType}
            onChange={(e) =>
              setCampaignType(e.target.value)
            }
            className="w-full border rounded-lg p-3 mt-2"
          >
            <option value="promotion">
              Promotion
            </option>

            <option value="double-points">
              Double Points
            </option>

            <option value="holiday">
              Holiday
            </option>

            <option value="birthday">
              Birthday
            </option>
          </select>
        </div>

        <div>
          <label className="font-semibold">
            Bonus Points
          </label>

          <input
            type="number"
            value={bonusPoints}
            onChange={(e) =>
              setBonusPoints(Number(e.target.value))
            }
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <label className="font-semibold">
              Start Date
            </label>

            <input
              type="date"
              value={startsAt}
              onChange={(e) =>
                setStartsAt(e.target.value)
              }
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">
              End Date
            </label>

            <input
              type="date"
              value={endsAt}
              onChange={(e) =>
                setEndsAt(e.target.value)
              }
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

        </div>

        <label className="flex items-center gap-3">

          <input
            type="checkbox"
            checked={active}
            onChange={(e) =>
              setActive(e.target.checked)
            }
          />

          Active Campaign

        </label>

        <button
          onClick={saveCampaign}
          disabled={saving}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
        >
          {saving
            ? "Saving..."
            : "Save Changes"}
        </button>

      </div>

    </main>
  );
}
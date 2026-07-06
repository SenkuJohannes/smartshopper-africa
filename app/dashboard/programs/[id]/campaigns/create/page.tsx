"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter, useParams } from "next/navigation";

export default function CreateCampaignPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const programId = params.id;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Must match the values allowed by the database
  const [campaignType, setCampaignType] = useState("promotion");

  const [bonusPoints, setBonusPoints] = useState(10);
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] =useState("");
  const [saving, setSaving] = useState(false);

  async function saveCampaign() {
    if (!name.trim()) {
      alert("Please enter a campaign name.");
      return;
    }

    setSaving(true);

    try {
      // Load loyalty program
      const { data: program, error: programError } = await supabase
        .from("programs")
        .select("business_id")
        .eq("id", programId)
        .single();

      if (programError || !program) {
        throw new Error("Unable to find the loyalty program.");
      }

      // Create campaign
      const { error } = await supabase
        .from("campaigns")
        .insert({
          business_id: program.business_id,
          program_id: programId,
          name,
          description,
          campaign_type: campaignType,
          bonus_points: bonusPoints,
          starts_at: startsAt || null,
          ends_at: endsAt || null,
          active: true,
        });

      if (error) throw error;

      router.push(`/dashboard/programs/${programId}/campaigns`);
      router.refresh();
    } catch (err: any) {
      console.error(err);
      alert(err.message ?? "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-8">
        <h1 className="text-3xl font-bold mb-2">
          Create Campaign
        </h1>

        <p className="text-gray-500 mb-8">
          Create a promotion that rewards your customers.
        </p>

        <div className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">
              Campaign Name
            </label>

            <input
              className="w-full border rounded-xl p-3"
              placeholder="Summer Promotion"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows={4}
              className="w-full border rounded-xl p-3"
              placeholder="Reward customers during this promotion."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Campaign Type
            </label>

            <select
              className="w-full border rounded-xl p-3"
              value={campaignType}
              onChange={(e) => setCampaignType(e.target.value)}
            >
              <option value="promotion">Promotion</option>
              <option value="marketing">Marketing</option>
              <option value="referral">Referral</option>
              <option value="seasonal">Seasonal</option>
              <option value="launch">Launch</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Bonus Points
            </label>

            <input
              type="number"
              min={0}
              className="w-full border rounded-xl p-3"
              value={bonusPoints}
              onChange={(e) => setBonusPoints(Number(e.target.value))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">
                Starts At
              </label>

              <input
                type="date"
                className="w-full border rounded-xl p-3"
                value={startsAt}
                onChange={(e) => setStartsAt(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Ends At
              </label>

              <input
                type="date"
                className="w-full border rounded-xl p-3"
                value={endsAt}
                onChange={(e) => setEndsAt(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={saveCampaign}
            disabled={saving}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-8 py-3 rounded-xl"
          >
            {saving ? "Saving..." : "Create Campaign"}
          </button>
        </div>
      </div>
    </main>
  );
}
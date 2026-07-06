"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function CreateEarningRulePage() {
  const params = useParams();
  const router = useRouter();

  const programId = params.id as string;

  const [name, setName] = useState("");
  const [ruleType, setRuleType] = useState("purchase_amount");
  const [points, setPoints] = useState(10);
  const [minimumPurchase, setMinimumPurchase] = useState(0);
  const [loading, setLoading] = useState(false);

  async function createRule() {
    setLoading(true);

    const { error } = await supabase
      .from("earning_rules")
      .insert({
        program_id: programId,
        name,
        rule_type: ruleType,
        points,
        minimum_purchase: minimumPurchase,
        active: true,
      });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Earning rule created!");

    router.push(`/dashboard/programs/${programId}/earning-rules`);
  }

  return (
    <main className="bg-slate-100 min-h-screen p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-10">

        <h1 className="text-4xl font-bold mb-2">
          Create Earning Rule
        </h1>

        <p className="text-gray-500 mb-10">
          Configure how customers earn loyalty points.
        </p>

        <div className="space-y-6">

          <input
            className="w-full border rounded-xl p-4"
            placeholder="Rule Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            className="w-full border rounded-xl p-4"
            value={ruleType}
            onChange={(e) => setRuleType(e.target.value)}
          >
            <option value="purchase_amount">
              Purchase Amount
            </option>

            <option value="purchase_item">
              Purchase Item
            </option>

            <option value="visit">
              Visit
            </option>

            <option value="qr_scan">
              QR Scan
            </option>

            <option value="manual">
              Manual Adjustment
            </option>

            <option value="referral">
              Referral
            </option>

            <option value="birthday">
              Birthday Bonus
            </option>
          </select>

          <input
            type="number"
            className="w-full border rounded-xl p-4"
            placeholder="Points"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
          />

          <input
            type="number"
            className="w-full border rounded-xl p-4"
            placeholder="Minimum Purchase (R)"
            value={minimumPurchase}
            onChange={(e) =>
              setMinimumPurchase(Number(e.target.value))
            }
          />

          <button
            onClick={createRule}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-4 font-bold"
          >
            {loading ? "Creating..." : "Create Rule"}
          </button>

        </div>

      </div>
    </main>
  );
}
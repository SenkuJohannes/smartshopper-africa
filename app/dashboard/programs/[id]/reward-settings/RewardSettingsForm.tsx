"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

type Props = {
  program: any;
};

export default function RewardSettingsForm({
  program,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [pointsPerVisit, setPointsPerVisit] = useState(
    program.points_per_visit ?? 10
  );

  const [pointsPerDiscount, setPointsPerDiscount] = useState(
    program.points_per_discount ?? 100
  );

  const [discountPerStep, setDiscountPerStep] = useState(
    program.discount_per_step ?? 10
  );

  const [maxDiscount, setMaxDiscount] = useState(
    program.max_discount ?? 100
  );

  const [rewardProduct, setRewardProduct] = useState(
    program.reward_product ?? "Large Cappuccino"
  );

  const [allowSavePoints, setAllowSavePoints] = useState(
    program.allow_save_points ?? true
  );

  // Demo Preview
  const demoPoints = 650;

  const steps = Math.floor(
    demoPoints / pointsPerDiscount
  );

  const discount = Math.min(
    steps * discountPerStep,
    maxDiscount
  );

  const pointsUsed = steps * pointsPerDiscount;

  const remaining = demoPoints - pointsUsed;

  async function saveSettings() {
    setLoading(true);

    const { error } = await supabase
      .from("programs")
      .update({
        points_per_visit: pointsPerVisit,
        points_per_discount: pointsPerDiscount,
        discount_per_step: discountPerStep,
        max_discount: maxDiscount,
        reward_product: rewardProduct,
        allow_save_points: allowSavePoints,
      })
      .eq("id", program.id);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("✅ Reward settings saved!");
  }

  return (
    <div className="mt-8 space-y-8">

      {/* Settings */}

      <div className="rounded-3xl bg-white shadow-xl p-8">

        <h2 className="text-2xl font-bold mb-6">
          Reward Settings
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <Field
            label="⭐ Points Per Visit"
            value={pointsPerVisit}
            setValue={setPointsPerVisit}
          />

          <Field
            label="🎯 Points Per Discount"
            value={pointsPerDiscount}
            setValue={setPointsPerDiscount}
          />

          <Field
            label="💰 Discount Per Step (%)"
            value={discountPerStep}
            setValue={setDiscountPerStep}
          />

          <Field
            label="🏆 Maximum Discount (%)"
            value={maxDiscount}
            setValue={setMaxDiscount}
          />

        </div>

        <div className="mt-6">

          <label className="font-semibold">
            ☕ Reward Product
          </label>

          <input
            value={rewardProduct}
            onChange={(e) =>
              setRewardProduct(e.target.value)
            }
            className="mt-2 w-full rounded-xl border p-3"
          />

        </div>

        <div className="mt-6 flex items-center gap-3">

          <input
            type="checkbox"
            checked={allowSavePoints}
            onChange={(e) =>
              setAllowSavePoints(e.target.checked)
            }
          />

          <span>
            Customers can save points for a bigger discount
          </span>

        </div>

        <button
          onClick={saveSettings}
          disabled={loading}
          className="mt-8 rounded-2xl bg-green-600 px-8 py-4 font-bold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading
            ? "Saving..."
            : "Save Settings"}
        </button>

      </div>

      {/* Live Preview */}

      <div className="rounded-3xl bg-gradient-to-br from-green-600 to-green-700 text-white shadow-xl p-8">

        <h2 className="text-3xl font-bold">
          Live Preview
        </h2>

        <p className="text-green-100 mt-2">
          Example customer with 650 points
        </p>

        <div className="mt-10 grid md:grid-cols-2 gap-8">

          <PreviewCard
            title="Current Points"
            value={`${demoPoints}`}
          />

          <PreviewCard
            title="Eligible Discount"
            value={`${discount}%`}
          />

          <PreviewCard
            title="Points Used"
            value={`${pointsUsed}`}
          />

          <PreviewCard
            title="Remaining Points"
            value={`${remaining}`}
          />

        </div>

        <div className="mt-10 rounded-2xl bg-white/15 p-6">

          <p className="text-lg">
            🎁 Selected Product
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            {rewardProduct}
          </h3>

        </div>

      </div>

    </div>
  );
}

function Field({
  label,
  value,
  setValue,
}: any) {
  return (
    <div>

      <label className="font-semibold">
        {label}
      </label>

      <input
        type="number"
        value={value}
        onChange={(e) =>
          setValue(Number(e.target.value))
        }
        className="mt-2 w-full rounded-xl border p-3"
      />

    </div>
  );
}

function PreviewCard({
  title,
  value,
}: any) {
  return (
    <div className="rounded-2xl bg-white/10 p-6">

      <p className="text-green-100">
        {title}
      </p>

      <h3 className="mt-3 text-4xl font-bold">
        {value}
      </h3>

    </div>
  );
}
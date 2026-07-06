"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function CreateProgramPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [programType, setProgramType] = useState("points");
  const [pointsPerPurchase, setPointsPerPurchase] = useState(10);
  const [pointsRequired, setPointsRequired] = useState(100);

  async function createProgram() {
    setLoading(true);

    const { error } = await supabase
      .from("programs")
      .insert({
        name,
        description,
        program_type: programType,
        points_per_purchase: pointsPerPurchase,
        points_required: pointsRequired,
        status: "active",
      });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Program created successfully!");

    router.push("/dashboard/programs");
  }

  return (
    <main className="min-h-screen bg-slate-100 flex justify-center p-10">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-10">

        <h1 className="text-3xl font-bold mb-2">
          Create Loyalty Program
        </h1>

        <p className="text-gray-500 mb-8">
          Configure your loyalty program.
        </p>

        <div className="space-y-6">

          <input
            className="w-full border rounded-xl p-4"
            placeholder="Program Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <textarea
            className="w-full border rounded-xl p-4"
            rows={4}
            placeholder="Description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
          />

          <select
            className="w-full border rounded-xl p-4"
            value={programType}
            onChange={(e)=>setProgramType(e.target.value)}
          >
            <option value="points">
              Points Program
            </option>

            <option value="stamp">
              Stamp Card
            </option>

            <option value="cashback">
              Cashback
            </option>
          </select>

          <input
            type="number"
            className="w-full border rounded-xl p-4"
            placeholder="Points Per Purchase"
            value={pointsPerPurchase}
            onChange={(e)=>setPointsPerPurchase(Number(e.target.value))}
          />

          <input
            type="number"
            className="w-full border rounded-xl p-4"
            placeholder="Points Required"
            value={pointsRequired}
            onChange={(e)=>setPointsRequired(Number(e.target.value))}
          />

          <button
            onClick={createProgram}
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-4 font-semibold"
          >
            {loading ? "Saving..." : "Create Program"}
          </button>

        </div>

      </div>

    </main>
  );
}
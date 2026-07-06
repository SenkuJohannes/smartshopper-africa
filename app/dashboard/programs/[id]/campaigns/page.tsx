import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import CampaignList from "./CampaignList";

export default async function CampaignsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: campaigns, error } = await supabase
    .from("campaigns")
    .select("*")
    .eq("program_id", id)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-slate-100 p-8">
        <div className="bg-red-100 border border-red-300 text-red-700 rounded-xl p-6">
          Failed to load campaigns: {error.message}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Campaigns</h1>

          <p className="text-gray-500">
            Create marketing campaigns and bonus promotions.
          </p>
        </div>

        <Link
          href={`/dashboard/programs/${id}/campaigns/create`}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
        >
          + Create Campaign
        </Link>
      </div>

      <CampaignList
        campaigns={campaigns ?? []}
        programId={id}
      />
    </main>
  );
}
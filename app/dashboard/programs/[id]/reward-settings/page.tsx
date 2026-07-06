import { supabase } from "@/lib/supabase/client";
import RewardSettingsForm from "./RewardSettingsForm";

export default async function RewardSettingsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: program } = await supabase
    .from("programs")
    .select("*")
    .eq("id", id)
    .single();

  if (!program) {
    return (
      <main className="p-10">
        Program not found.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">

      <div className="mx-auto max-w-3xl">

        <h1 className="text-4xl font-bold">
          Reward Settings
        </h1>

        <p className="mt-2 text-gray-500">
          Configure how customers earn and redeem discounts.
        </p>

        <RewardSettingsForm
          program={program}
        />

      </div>

    </main>
  );
}
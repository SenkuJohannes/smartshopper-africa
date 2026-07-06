import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export default async function ProgramsPage() {
  const { data: programs } = await supabase
    .from("programs")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="p-8 bg-slate-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Loyalty Programs
          </h1>

          <p className="text-gray-500">
            Create and manage loyalty campaigns
          </p>
        </div>

        <Link href="/dashboard/create-program">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition">
            + Create Program
          </button>
        </Link>
      </div>

      <div className="grid gap-6">
        {programs?.map((program) => (
          <Link
            key={program.id}
            href={`/dashboard/programs/${program.id}`}
            className="block bg-white rounded-2xl shadow hover:shadow-xl transition duration-200"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">
                    {program.name}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {program.description}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    program.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {program.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6 text-sm">
                <div>
                  <p className="text-gray-500">Type</p>
                  <p className="font-semibold">
                    {program.program_type}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Points / Purchase
                  </p>
                  <p className="font-semibold">
                    {program.points_per_purchase}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Reward Cost
                  </p>
                  <p className="font-semibold">
                    {program.points_required}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <span className="text-green-600 font-semibold">
                  Manage →
                </span>
              </div>
            </div>
          </Link>
        ))}

        {programs?.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center">
            <h2 className="text-2xl font-bold">
              No Loyalty Programs Yet
            </h2>

            <p className="text-gray-500 mt-3">
              Click <strong>Create Program</strong> to build your first loyalty campaign.
            </p>

            <Link href="/dashboard/create-program">
              <button className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl">
                Create Your First Program
              </button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export default async function ScannersPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: programId } = await params;

  const { data: scanners, error } = await supabase
    .from("scanners")
    .select("*")
    .eq("program_id", programId)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-slate-100 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
            <h1 className="text-2xl font-bold text-red-700">
              Failed to load scanners
            </h1>

            <p className="mt-3 text-red-600">
              {error.message}
            </p>
          </div>
        </div>
      </main>
    );
  }

  const totalScanners = scanners?.length ?? 0;

  const onlineScanners =
    scanners?.filter((scanner) => scanner.status === "online")
      .length ?? 0;

  const offlineScanners = totalScanners - onlineScanners;

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="mb-8 flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold">
              SmartShopper Scanners
            </h1>

            <p className="mt-2 text-gray-500">
              Manage your SmartShopper scanner devices.
            </p>
          </div>

          <Link
            href={`/dashboard/programs/${programId}/scanners/create`}
            className="rounded-xl bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700"
          >
            + Pair Scanner
          </Link>

        </div>

        {/* Stats */}

        <div className="mb-8 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Total Scanners
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              {totalScanners}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Online
            </p>

            <h2 className="mt-2 text-4xl font-bold text-green-600">
              {onlineScanners}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Offline
            </p>

            <h2 className="mt-2 text-4xl font-bold text-red-500">
              {offlineScanners}
            </h2>
          </div>

        </div>

        {/* Scanner List */}

        <div className="space-y-6">

          {scanners && scanners.length > 0 ? (

            scanners.map((scanner) => (

              <div
                key={scanner.id}
                className="flex items-center justify-between rounded-2xl bg-white p-6 shadow"
              >

                <div>

                  <h2 className="text-2xl font-bold">
                    {scanner.name}
                  </h2>

                  <p className="mt-2 text-gray-500">
                    📍 {scanner.location || "No location assigned"}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-6 text-sm">

                    <span>
                      {scanner.status === "online"
                        ? "🟢 Online"
                        : "🔴 Offline"}
                    </span>

                    <span>
                      🔋 {scanner.battery_level ?? 0}%
                    </span>

                    <span>
                      🔑 {scanner.pairing_code}
                    </span>

                  </div>

                </div>

                <div className="flex gap-3">

                  <Link
                    href={`/dashboard/programs/${programId}/scanners/${scanner.id}`}
                    className="rounded-lg bg-slate-800 px-5 py-2 text-white transition hover:bg-slate-900"
                  >
                    Open
                  </Link>

                </div>

              </div>

            ))

          ) : (

            <div className="rounded-2xl bg-white p-16 text-center shadow">

              <div className="text-6xl">
                📷
              </div>

              <h2 className="mt-6 text-3xl font-bold">
                No Scanners Yet
              </h2>

              <p className="mt-3 text-gray-500">
                Pair your first SmartShopper Scanner to start
                awarding loyalty points.
              </p>

              <Link
                href={`/dashboard/programs/${programId}/scanners/create`}
                className="mt-8 inline-block rounded-xl bg-green-600 px-8 py-3 font-medium text-white transition hover:bg-green-700"
              >
                Pair First Scanner
              </Link>

            </div>

          )}

        </div>

      </div>
    </main>
  );
}
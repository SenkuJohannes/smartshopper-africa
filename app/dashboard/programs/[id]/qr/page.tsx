import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export default async function QRPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: program } = await supabase
    .from("programs")
    .select("name")
    .eq("id", id)
    .single();

  const joinUrl = `http://localhost:3000/join/${id}`;

  return (
    <main className="space-y-8">

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-4xl font-bold">
            QR Code Management
          </h1>

          <p className="text-gray-500 mt-2">
            Customers scan this QR code to join your loyalty program.
          </p>
        </div>

      </div>

      <div className="grid grid-cols-3 gap-8">

        {/* QR CARD */}

        <div className="col-span-2 bg-white rounded-2xl shadow p-10">

          <h2 className="text-2xl font-bold">
            {program?.name}
          </h2>

          <p className="text-gray-500 mb-8">
            Loyalty Program QR Code
          </p>

          <div className="flex justify-center">

            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(
                joinUrl
              )}`}
              alt="QR Code"
              className="rounded-xl border"
            />

          </div>

          <div className="mt-8">

            <label className="font-semibold">
              Join Link
            </label>

            <div className="mt-2 bg-slate-100 rounded-xl p-4 break-all">
              {joinUrl}
            </div>

          </div>

          <div className="flex gap-4 mt-8">

            <a
              href={`https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${encodeURIComponent(
                joinUrl
              )}`}
              target="_blank"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
            >
              Download QR
            </a>

            <Link
              href={joinUrl}
              className="border px-6 py-3 rounded-xl"
            >
              Test Join Page
            </Link>

          </div>

        </div>

        {/* STATS */}

        <div className="space-y-6">

          <div className="bg-white rounded-2xl shadow p-8">

            <p className="text-gray-500">
              QR Scans
            </p>

            <h2 className="text-5xl font-bold mt-3">
              0
            </h2>

          </div>

          <div className="bg-white rounded-2xl shadow p-8">

            <p className="text-gray-500">
              Members Joined
            </p>

            <h2 className="text-5xl font-bold mt-3">
              0
            </h2>

          </div>

          <div className="bg-white rounded-2xl shadow p-8">

            <p className="text-gray-500">
              Conversion
            </p>

            <h2 className="text-5xl font-bold mt-3">
              0%
            </h2>

          </div>

        </div>

      </div>

    </main>
  );
}
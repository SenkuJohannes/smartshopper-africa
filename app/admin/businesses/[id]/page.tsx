import Link from "next/link";
import { notFound } from "next/navigation";

import { supabaseAdmin } from "@/lib/supabase/admin";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function BusinessDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Business
  const { data: business } = await supabaseAdmin
    .from("businesses")
    .select("*")
    .eq("id", id)
    .single();

  if (!business) {
    notFound();
  }

  // Customers
  const { count: customerCount } = await supabaseAdmin
    .from("customers")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("business_id", id);

  // Programs
  const { count: programCount } = await supabaseAdmin
    .from("programs")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("business_id", id);

  // Scanners
  const { count: scannerCount } = await supabaseAdmin
    .from("scanners")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("business_id", id);

  // Campaigns
  const { count: campaignCount } = await supabaseAdmin
    .from("campaigns")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("business_id", id);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            {business.name}
          </h1>

          <p className="mt-2 text-gray-500">
            {business.email}
          </p>
        </div>

        <Badge>{business.status}</Badge>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <button className="rounded-xl border px-4 py-2 hover:bg-slate-100">
          ✏ Edit Business
        </button>

        <button className="rounded-xl bg-green-600 px-4 py-2 text-white hover:bg-green-700">
          👤 Login as Business
        </button>

        <button className="rounded-xl border px-4 py-2 hover:bg-slate-100">
          📊 Analytics
        </button>

        <button className="rounded-xl border px-4 py-2 hover:bg-slate-100">
          💳 Billing
        </button>

        <button className="rounded-xl border px-4 py-2 hover:bg-slate-100">
          📱 QR Scanners
        </button>

        <button className="rounded-xl border px-4 py-2 hover:bg-slate-100">
          ⚙ Settings
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm text-gray-500">
              Customers
            </h3>

            <p className="mt-3 text-4xl font-bold">
              {customerCount ?? 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm text-gray-500">
              Programs
            </h3>

            <p className="mt-3 text-4xl font-bold">
              {programCount ?? 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm text-gray-500">
              Scanners
            </h3>

            <p className="mt-3 text-4xl font-bold">
              {scannerCount ?? 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm text-gray-500">
              Campaigns
            </h3>

            <p className="mt-3 text-4xl font-bold">
              {campaignCount ?? 0}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-6 border-b pb-4 overflow-x-auto">

            <Link
              href={`/admin/businesses/${id}`}
              className="font-medium text-green-600"
            >
              Overview
            </Link>

            <Link href={`/admin/businesses/${id}/programs`}>
              Programs
            </Link>

            <Link href={`/admin/businesses/${id}/customers`}>
              Customers
            </Link>

            <Link href={`/admin/businesses/${id}/rewards`}>
              Rewards
            </Link>

            <Link href={`/admin/businesses/${id}/scanners`}>
              Scanners
            </Link>

            <Link href={`/admin/businesses/${id}/campaigns`}>
              Campaigns
            </Link>

            <Link href={`/admin/businesses/${id}/transactions`}>
              Transactions
            </Link>

            <Link href={`/admin/businesses/${id}/billing`}>
              Billing
            </Link>

            <Link href={`/admin/businesses/${id}/settings`}>
              Settings
            </Link>
          </div>

          <div className="py-10 text-gray-500">
            Select a section above to manage this business.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
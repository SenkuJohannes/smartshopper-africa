import StatCard from "@/components/admin/stat-card";
import { supabaseAdmin } from "@/lib/supabase/admin";

export default async function AdminDashboard() {
  // ==========================================
  // Get platform statistics
  // ==========================================

  const [
    businessesResult,
    customersResult,
    programsResult,
    scannersResult,
  ] = await Promise.all([
    supabaseAdmin
      .from("businesses")
      .select("*", { count: "exact", head: true }),

    supabaseAdmin
      .from("customers")
      .select("*", { count: "exact", head: true }),

    supabaseAdmin
      .from("programs")
      .select("*", { count: "exact", head: true }),

    supabaseAdmin
      .from("scanners")
      .select("*", { count: "exact", head: true }),
  ]);

  const businessCount = businessesResult.count ?? 0;
  const customerCount = customersResult.count ?? 0;
  const programCount = programsResult.count ?? 0;
  const scannerCount = scannersResult.count ?? 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          SmartShopper Admin
        </h1>

        <p className="mt-2 text-gray-500">
          Platform overview
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Businesses"
          value={businessCount}
        />

        <StatCard
          title="Customers"
          value={customerCount}
        />

        <StatCard
          title="Programs"
          value={programCount}
        />

        <StatCard
          title="Scanners"
          value={scannerCount}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <StatCard
          title="Monthly Revenue"
          value="R0"
        />

        <StatCard
          title="QR Scans Today"
          value={0}
        />
      </div>
    </div>
  );
}
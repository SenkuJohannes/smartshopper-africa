import { redirect } from "next/navigation";

import Sidebar from "@/components/dashboard/sidebar";
import Topbar from "@/components/dashboard/topbar";
import BusinessCard from "@/components/dashboard/business-card";
import StatCard from "@/components/dashboard/stat-card";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function Dashboard() {
  const supabase = await createSupabaseServerClient();

  // ==========================================
  // DEBUG AUTH SESSION
  // ==========================================

  const sessionResult = await supabase.auth.getSession();
  const userResult = await supabase.auth.getUser();

  console.log("====================================");
  console.log("SESSION:");
  console.dir(sessionResult, { depth: null });

  console.log("USER:");
  console.dir(userResult, { depth: null });
  console.log("====================================");

  const user = userResult.data.user;

  // Not signed in?
  if (!user) {
    console.log("❌ No authenticated user found.");
    redirect("/login");
  }

  console.log("✅ Logged in as:", user.email);
  console.log("User ID:", user.id);

  // ==========================================
  // Load ONLY this owner's businesses
  // ==========================================

  const { data: businesses, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });

  console.log("Businesses returned:");
  console.dir(businesses, { depth: null });

  if (error) {
    console.error("Business query error:");
    console.error(error);
  }

  console.log("Business count:", businesses?.length);
  console.log("====================================");

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1">
        <Topbar />

        <div className="p-8">
          <div className="grid grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Businesses"
              value={businesses?.length ?? 0}
            />

            <StatCard
              title="Customers"
              value="0"
            />

            <StatCard
              title="Points Issued"
              value="0"
            />

            <StatCard
              title="Rewards Redeemed"
              value="0"
            />
          </div>

          <>
  <div className="mb-6 rounded-xl border-2 border-red-500 bg-red-50 p-4">
    <h2 className="text-xl font-bold text-red-700">
      Dashboard Debug
    </h2>

    <p className="mt-2">
      businesses.length = <strong>{businesses?.length ?? 0}</strong>
    </p>

    <pre className="mt-4 overflow-auto rounded bg-white p-4 text-xs">
      {JSON.stringify(businesses, null, 2)}
    </pre>
  </div>

  <BusinessCard businesses={businesses ?? []} />
</>
        </div>
      </div>
    </div>
  );
}
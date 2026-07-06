import Sidebar from "@/components/dashboard/sidebar"
import Topbar from "@/components/dashboard/topbar"
import BusinessCard from "@/components/dashboard/business-card"
import StatCard from "@/components/dashboard/stat-card"

import { supabase } from "@/lib/supabase/client"

export default async function Dashboard() {
  const { data: businesses } = await supabase
    .from("businesses")
    .select("*")

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1">

        <Topbar />

        <div className="p-8">

          <div className="grid grid-cols-4 gap-6 mb-8">

            <StatCard
              title="Businesses"
              value={businesses?.length || 0}
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

          <BusinessCard businesses={businesses || []} />

        </div>

      </div>

    </div>
  )
}
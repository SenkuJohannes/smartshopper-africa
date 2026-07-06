"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import {
  Users,
  Star,
  BarChart3,
  BadgeCheck,
  UserPlus,
} from "lucide-react";

import PageHeader from "@/components/dashboard/page-header";
import StatCard from "@/components/dashboard/stat-card";
import CustomerAvatar from "@/components/dashboard/customer-avatar";
import StatusBadge from "@/components/dashboard/status-badge";
import SearchBar from "@/components/dashboard/search-bar";

type Membership = {
  member_number: string;
  current_points: number;
  lifetime_points: number;
  visits_count: number;
  status: string;
};

type CustomerRow = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  membership: Membership | null;
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerRow[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    setLoading(true);

    const { data: customerData, error: customerError } = await supabase
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: memberships } = await supabase
      .from("customer_memberships")
      .select("*");

    if (customerError || !customerData) {
      console.error(customerError);
      setLoading(false);
      return;
    }

    const rows: CustomerRow[] = customerData
      .map((customer) => ({
        ...customer,
        membership:
          memberships?.find(
            (membership) => membership.customer_id === customer.id
          ) ?? null,
      }))
      .filter(
        (customer) =>
          customer.first_name ||
          customer.last_name ||
          customer.email ||
          customer.phone
      );

    setCustomers(rows);
    setLoading(false);
  }

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const searchValue = `${customer.first_name ?? ""} ${
        customer.last_name ?? ""
      } ${customer.email ?? ""} ${customer.phone ?? ""}`.toLowerCase();

      return searchValue.includes(search.toLowerCase());
    });
  }, [customers, search]);

  const totalPoints = customers.reduce(
    (sum, customer) => sum + (customer.membership?.current_points ?? 0),
    0
  );

  const totalVisits = customers.reduce(
    (sum, customer) => sum + (customer.membership?.visits_count ?? 0),
    0
  );

  const activeMembers = customers.filter(
    (customer) => customer.membership?.status === "active"
  ).length;

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-8">
      <PageHeader
        title="Customers"
        description="Manage everyone enrolled in your loyalty programs."
        action={
          <button className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 font-medium text-white transition hover:bg-green-700">
            <UserPlus size={18} />
            Add Customer
          </button>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Customers"
          value={customers.length}
          icon={Users}
        />

        <StatCard
          title="Points Issued"
          value={totalPoints}
          icon={Star}
        />

        <StatCard
          title="Visits"
          value={totalVisits}
          icon={BarChart3}
        />

        <StatCard
          title="Active Members"
          value={activeMembers}
          icon={BadgeCheck}
        />
      </div>

      <SearchBar
        value={search}
        onChange={setSearch}
      />

      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <table className="min-w-full">
          <thead className="bg-zinc-50">
            <tr className="text-left text-sm font-semibold text-zinc-600">
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Member #</th>
              <th className="px-6 py-4">Points</th>
              <th className="px-6 py-4">Visits</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td
                  colSpan={6}
                  className="p-10 text-center text-zinc-500"
                >
                  Loading customers...
                </td>
              </tr>
            )}

            {!loading && filteredCustomers.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="p-10 text-center text-zinc-500"
                >
                  No customers found.
                </td>
              </tr>
            )}

            {!loading &&
              filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-t transition hover:bg-zinc-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <CustomerAvatar
                        firstName={customer.first_name}
                        lastName={customer.last_name}
                      />

                      <div>
                        <p className="font-semibold text-zinc-900">
                          {customer.first_name} {customer.last_name}
                        </p>

                        <p className="text-sm text-zinc-500">
                          {customer.email || "No email"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-zinc-700">
                    {customer.phone || "-"}
                  </td>

                  <td className="px-6 py-4 font-medium">
                    {customer.membership?.member_number ?? "-"}
                  </td>

                  <td className="px-6 py-4 font-semibold text-green-600">
                    {customer.membership?.current_points ?? 0}
                  </td>

                  <td className="px-6 py-4">
                    {customer.membership?.visits_count ?? 0}
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge
                      status={customer.membership?.status ?? "Unknown"}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
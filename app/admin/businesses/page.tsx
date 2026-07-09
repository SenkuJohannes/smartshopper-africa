import Link from "next/link";

import { supabaseAdmin } from "@/lib/supabase/admin";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Badge,
} from "@/components/ui/badge";

export default async function BusinessesPage() {
  const { data: businesses } = await supabaseAdmin
    .from("businesses")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold">
            Businesses
          </h1>

          <p className="text-gray-500 mt-2">
            Manage every business on SmartShopper.
          </p>
        </div>

        <Link
  href="/onboarding/welcome"
  className="rounded-xl bg-green-600 px-5 py-3 text-white hover:bg-green-700"
>
  + New Business
</Link>

      </div>

      <Card className="rounded-2xl">
        <CardContent className="p-0">

          <table className="w-full">

            <thead className="border-b bg-slate-50">

              <tr>

                <th className="p-4 text-left">
                  Business
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  Industry
                </th>

                <th className="p-4 text-left">
                  Plan
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-right">
                  View
                </th>

              </tr>

            </thead>

            <tbody>

              {businesses?.map((business) => (

                <tr
                  key={business.id}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="p-4 font-semibold">
                    {business.name}
                  </td>

                  <td className="p-4">
                    {business.email}
                  </td>

                  <td className="p-4">
                    {business.industry || "-"}
                  </td>

                  <td className="p-4">
                    {business.subscription}
                  </td>

                  <td className="p-4">
                    <Badge>
                      {business.status}
                    </Badge>
                  </td>

                  <td className="p-4 text-right">

                    <Link
                      href={`/admin/businesses/${business.id}`}
                      className="text-green-600 hover:underline"
                    >
                      Open
                    </Link>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </CardContent>
      </Card>

    </div>
  );
}
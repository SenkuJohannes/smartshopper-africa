import Link from "next/link";

import { supabaseAdmin } from "@/lib/supabase/admin";

import { Card, CardContent } from "@/components/ui/card";

export default async function CustomersPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: business } = await supabaseAdmin
    .from("businesses")
    .select("name")
    .eq("id", id)
    .single();

  const { data: customers } = await supabaseAdmin
    .from("customers")
    .select("*")
    .eq("business_id", id)
    .order("created_at", {
      ascending: false,
    });

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold">
            Customers
          </h1>

          <p className="mt-2 text-gray-500">
            {business?.name}
          </p>
        </div>

        <button className="rounded-xl bg-green-600 px-5 py-3 text-white hover:bg-green-700">
          + Add Customer
        </button>

      </div>

      <Card>
        <CardContent className="p-0">

          <table className="w-full">

            <thead className="border-b bg-slate-50">

              <tr>

                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  Phone
                </th>

                <th className="p-4 text-right">
                  View
                </th>

              </tr>

            </thead>

            <tbody>

              {customers?.map((customer) => (

                <tr
                  key={customer.id}
                  className="border-b"
                >

                  <td className="p-4">
                    {customer.first_name} {customer.last_name}
                  </td>

                  <td className="p-4">
                    {customer.email}
                  </td>

                  <td className="p-4">
                    {customer.phone}
                  </td>

                  <td className="p-4 text-right">

                    <Link
                      href="#"
                      className="text-green-600 hover:underline"
                    >
                      Open
                    </Link>

                  </td>

                </tr>

              ))}

              {customers?.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="p-8 text-center text-gray-500"
                  >
                    No customers yet.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </CardContent>
      </Card>

    </div>
  );
}
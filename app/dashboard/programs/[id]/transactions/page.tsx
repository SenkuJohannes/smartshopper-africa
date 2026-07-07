import { supabaseAdmin } from "@/lib/supabase/admin";

export default async function TransactionsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: programId } = await params;

  // Step 1: Get all memberships for this program
  const { data: memberships, error: membershipsError } =
    await supabaseAdmin
      .from("customer_memberships")
      .select(`
        id,
        member_number,
        customers (
          first_name,
          last_name,
          email
        )
      `)
      .eq("program_id", programId);

  if (membershipsError) {
    console.error("Membership Error:", membershipsError);
  }

  const membershipMap = new Map();

  memberships?.forEach((membership: any) => {
    membershipMap.set(membership.id, membership);
  });

  const membershipIds = memberships?.map((m: any) => m.id) ?? [];

  // Step 2: Get all transactions
  const { data: transactions, error: transactionsError } =
    await supabaseAdmin
      .from("loyalty_transactions")
      .select("*")
      .in("membership_id", membershipIds)
      .order("created_at", { ascending: false });

  if (transactionsError) {
    console.error("Transaction Error:", transactionsError);
  }

  console.log("Program:", programId);
  console.log("Membership IDs:", membershipIds);
  console.log("Membership Count:", memberships?.length);
  console.log("Transaction Count:", transactions?.length);

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            Transactions
          </h1>

          <p className="text-gray-500">
            View all loyalty point activity.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="text-left p-4">Customer</th>
              <th className="text-left p-4">Member #</th>
              <th className="text-left p-4">Type</th>
              <th className="text-left p-4">Points</th>
              <th className="text-left p-4">Balance</th>
              <th className="text-left p-4">Description</th>
              <th className="text-left p-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {transactions?.map((transaction: any) => {
              const membership = membershipMap.get(transaction.membership_id);

              const customer = Array.isArray(membership?.customers)
                ? membership.customers[0]
                : membership?.customers;

              return (
                <tr
                  key={transaction.id}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="p-4 font-medium">
                    {customer
                      ? `${customer.first_name} ${customer.last_name}`
                      : "Unknown Customer"}
                  </td>

                  <td className="p-4">
                    {membership?.member_number ?? "-"}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        transaction.transaction_type === "earn"
                          ? "bg-green-100 text-green-700"
                          : transaction.transaction_type === "redeem"
                          ? "bg-red-100 text-red-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {transaction.transaction_type}
                    </span>
                  </td>

                  <td
                    className={`p-4 font-bold ${
                      transaction.transaction_type === "redeem"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {transaction.transaction_type === "redeem"
                      ? `-${transaction.points}`
                      : `+${transaction.points}`}
                  </td>

                  <td className="p-4">
                    {transaction.balance_after ?? "-"}
                  </td>

                  <td className="p-4">
                    {transaction.description ?? "-"}
                  </td>

                  <td className="p-4 text-gray-500">
                    {new Date(transaction.created_at).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {(!transactions || transactions.length === 0) && (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold">
              No Transactions Yet
            </h2>

            <p className="text-gray-500 mt-2">
              Transactions will appear here when customers earn or redeem
              loyalty points.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
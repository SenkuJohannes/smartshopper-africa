import {
  Gift,
  Trophy,
  PlusCircle,
  ArrowDownCircle,
} from "lucide-react";

type Transaction = {
  id: string;
  description: string;
  points: number;
  transaction_type: string;
  created_at: string;
};

type Props = {
  transactions: Transaction[];
};

function formatDate(date: string) {
  const d = new Date(date);
  const today = new Date();

  const diff = Math.floor(
    (today.getTime() - d.getTime()) / 86400000
  );

  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";

  return d.toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function LoyaltyCardActivity({
  transactions,
}: Props) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 px-6 py-5 text-white">

        <h2 className="text-xl font-bold">
          🕒 Recent Activity
        </h2>

        <p className="mt-1 text-sm text-slate-300">
          Your latest loyalty transactions
        </p>

      </div>

      {transactions.length === 0 ? (

        <div className="flex flex-col items-center justify-center p-12 text-center">

          <Gift
            className="mb-4 text-slate-300"
            size={42}
          />

          <h3 className="font-semibold text-gray-700">
            No activity yet
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Your purchases and rewards will appear here.
          </p>

        </div>

      ) : (

        <div className="divide-y">

          {transactions.map((transaction) => {

            const positive = transaction.points >= 0;

            let icon = (
              <PlusCircle
                className="text-green-600"
                size={22}
              />
            );

            let badge =
              "bg-green-100 text-green-700";

            let label = "Earned";

            if (
              transaction.transaction_type ===
              "redeem"
            ) {
              icon = (
                <ArrowDownCircle
                  className="text-red-600"
                  size={22}
                />
              );

              badge =
                "bg-red-100 text-red-700";

              label = "Redeemed";
            }

            if (
              transaction.transaction_type ===
              "bonus"
            ) {
              icon = (
                <Trophy
                  className="text-amber-500"
                  size={22}
                />
              );

              badge =
                "bg-amber-100 text-amber-700";

              label = "Bonus";
            }

            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between px-6 py-5 transition hover:bg-slate-50"
              >

                <div className="flex items-center gap-4">

                  <div className="rounded-full bg-slate-100 p-3">
                    {icon}
                  </div>

                  <div>

                    <h3 className="font-semibold text-gray-900">
                      {transaction.description}
                    </h3>

                    <div className="mt-2 flex items-center gap-3">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${badge}`}
                      >
                        {label}
                      </span>

                      <span className="text-sm text-gray-500">
                        {formatDate(
                          transaction.created_at
                        )}
                      </span>

                    </div>

                  </div>

                </div>

                <div
                  className={`rounded-full px-4 py-2 font-bold ${
                    positive
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {positive ? "+" : ""}
                  {transaction.points}
                </div>

              </div>
            );
          })}

        </div>

      )}

    </div>
  );
}
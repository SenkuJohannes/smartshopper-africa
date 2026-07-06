import {
  Gift,
  TicketPercent,
  ChevronRight,
  Loader2,
} from "lucide-react";

interface RewardCouponCardProps {
  title: string;
  reward: string;
  expires?: string;
  loading?: boolean;
  onRedeem?: () => void;
}

export default function RewardCouponCard({
  title,
  reward,
  expires,
  loading = false,
  onRedeem,
}: RewardCouponCardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-green-200 bg-gradient-to-r from-green-50 to-white p-6 shadow">

      <div className="absolute -right-6 -top-6 rounded-full bg-green-100 p-8 opacity-40" />

      <div className="relative">

        <div className="flex items-center gap-3">

          <div className="rounded-2xl bg-green-600 p-3 text-white">
            <Gift size={22} />
          </div>

          <div>

            <h2 className="text-xl font-bold">
              {title}
            </h2>

            <p className="text-gray-500">
              Reward Ready
            </p>

          </div>

        </div>

        <div className="my-8 rounded-2xl bg-white p-6">

          <div className="flex items-center gap-3">

            <TicketPercent
              className="text-green-600"
              size={26}
            />

            <h3 className="text-2xl font-bold">
              {reward}
            </h3>

          </div>

        </div>

        {expires && (
          <p className="mb-6 text-sm text-gray-500">
            Expires {expires}
          </p>
        )}

        <button
          onClick={onRedeem}
          disabled={loading}
          className={`flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-lg font-bold text-white transition ${
            loading
              ? "cursor-not-allowed bg-gray-400"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? (
            <>
              <Loader2
                size={20}
                className="animate-spin"
              />
              Redeeming...
            </>
          ) : (
            <>
              Redeem Reward
              <ChevronRight size={18} />
            </>
          )}

        </button>

      </div>

    </div>
  );
}
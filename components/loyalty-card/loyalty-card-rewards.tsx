type Props = {
  points: number;
};

export default function LoyaltyCardRewards({
  points,
}: Props) {
  const rewards = [
    {
      required: 100,
      title: "5% Discount",
    },
    {
      required: 1000,
      title: "10% Discount",
    },
    {
      required: 2500,
      title: "15% Discount",
    },
    {
      required: 5000,
      title: "20% Discount",
    },
    {
      required: 10000,
      title: "Free Product",
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6">

      <h2 className="text-xl font-bold mb-5">
        🎁 Rewards
      </h2>

      <div className="space-y-4">

        {rewards.map((reward) => {

          const unlocked = points >= reward.required;

          return (
            <div
              key={reward.required}
              className={`rounded-2xl border p-4 ${
                unlocked
                  ? "bg-green-50 border-green-300"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex justify-between items-center">

                <div>
                  <h3 className="font-bold">
                    {reward.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Unlock at {reward.required} points
                  </p>
                </div>

                <div className="text-2xl">
                  {unlocked ? "✅" : "🔒"}
                </div>

              </div>
            </div>
          );
        })}

      </div>

    </div>
  );
}
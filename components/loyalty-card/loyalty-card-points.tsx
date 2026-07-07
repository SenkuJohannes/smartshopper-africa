type Props = {
  points: number;
};

export default function LoyaltyCardPoints({
  points,
}: Props) {
  // Temporary reward target
  // Later this will come from the rewards table.
  const nextReward = 100;

  const progress = Math.min((points / nextReward) * 100, 100);
  const pointsRemaining = Math.max(nextReward - points, 0);

  let tier = "Bronze";
  let tierEmoji = "🥉";

  if (points >= 1000) {
    tier = "Platinum";
    tierEmoji = "💎";
  } else if (points >= 500) {
    tier = "Gold";
    tierEmoji = "🥇";
  } else if (points >= 250) {
    tier = "Silver";
    tierEmoji = "🥈";
  }

  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
            Available Points
          </p>

          <h1 className="mt-2 text-6xl font-extrabold text-green-600">
            {points}
          </h1>

          <div className="mt-3 inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            {tierEmoji} {tier} Member
          </div>
        </div>

        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
          ☕
        </div>
      </div>

      {/* Progress */}
      <div className="mt-10">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-semibold text-gray-700">
            Next Reward
          </span>

          <span className="text-sm text-gray-500">
            {Math.round(progress)}%
          </span>
        </div>

        <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-green-600 transition-all duration-700"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <div className="mt-4">
          {pointsRemaining > 0 ? (
            <p className="font-medium text-green-700">
              🎁 Only{" "}
              <strong>{pointsRemaining} points</strong> until
              your FREE coffee.
            </p>
          ) : (
            <p className="font-bold text-green-700">
              🎉 Congratulations! Your reward is ready to
              redeem.
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 flex items-center justify-between border-t pt-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400">
            Current Progress
          </p>

          <p className="mt-1 font-semibold">
            {points} / {nextReward} Points
          </p>
        </div>

        <div className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
          ☕ FREE Coffee
        </div>
      </div>
    </div>
  );
}
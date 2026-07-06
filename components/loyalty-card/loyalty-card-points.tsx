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

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
            ⭐ Available Points
          </p>

          <h1 className="text-6xl font-extrabold text-green-600 mt-3">
            {points}
          </h1>
        </div>

        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-3xl">
          ⭐
        </div>

      </div>

      {/* Reward Message */}
      <div className="mt-8">

        {pointsRemaining > 0 ? (
          <p className="text-lg text-green-700 font-semibold">
            🎉 {pointsRemaining} points until your next reward!
          </p>
        ) : (
          <p className="text-lg font-bold text-green-700">
            🎁 Reward Unlocked!
          </p>
        )}

      </div>

      {/* Progress Bar */}
      <div className="mt-6">

        <div className="h-4 w-full rounded-full bg-gray-200 overflow-hidden">

          <div
            className="h-full rounded-full bg-green-600 transition-all duration-700"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

      {/* Footer */}
      <div className="mt-5 flex justify-between text-sm text-gray-500">

        <span>
          {points} / {nextReward} points
        </span>

        <span className="font-semibold text-green-700">
          🎁 FREE Coffee
        </span>

      </div>

    </div>
  );
}
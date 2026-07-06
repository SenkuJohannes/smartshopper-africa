interface Props {
  scansToday: number;
  pointsToday: number;
  redeemedToday: number;
}

export default function ScannerStats({
  scansToday,
  pointsToday,
  redeemedToday,
}: Props) {
  return (
    <div className="mb-8 grid gap-6 md:grid-cols-3">

      <div className="rounded-2xl bg-white p-6 shadow">
        <p className="text-gray-500">
          Today's Scans
        </p>

        <h2 className="mt-2 text-4xl font-bold">
          {scansToday}
        </h2>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow">
        <p className="text-gray-500">
          Points Awarded
        </p>

        <h2 className="mt-2 text-4xl font-bold text-green-600">
          {pointsToday}
        </h2>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow">
        <p className="text-gray-500">
          Rewards Redeemed
        </p>

        <h2 className="mt-2 text-4xl font-bold text-orange-500">
          {redeemedToday}
        </h2>
      </div>

    </div>
  );
}
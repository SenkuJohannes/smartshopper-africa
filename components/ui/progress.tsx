interface Props {
  current: number;
  total: number;
}

export default function Progress({
  current,
  total,
}: Props) {
  const width = (current / total) * 100;

  return (
    <div className="mb-10">
      <div className="mb-2 flex justify-between text-sm text-zinc-500">
        <span>
          Step {current} of {total}
        </span>

        <span>{Math.round(width)}%</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-zinc-200">
        <div
          className="h-full rounded-full bg-green-600 transition-all duration-500"
          style={{
            width: `${width}%`,
          }}
        />
      </div>
    </div>
  );
}
interface Props {
  status: string;
}

export default function StatusBadge({ status }: Props) {
  const active = status === "active";

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        active
          ? "bg-green-100 text-green-700"
          : "bg-zinc-100 text-zinc-600"
      }`}
    >
      {status}
    </span>
  );
}
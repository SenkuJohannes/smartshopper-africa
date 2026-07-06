import { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  value: string | number;
  icon: LucideIcon;
};

export default function StatCard({
  title,
  value,
  icon: Icon,
}: Props) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-zinc-900">
            {value}
          </h2>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100">
          <Icon
            size={28}
            className="text-green-600"
          />
        </div>
      </div>
    </div>
  );
}
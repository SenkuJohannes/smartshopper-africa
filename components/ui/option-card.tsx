import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  description: string;
  icon: LucideIcon;
  selected?: boolean;
  onClick?: () => void;
}

export default function OptionCard({
  title,
  description,
  icon: Icon,
  selected = false,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full
        rounded-2xl
        border-2
        p-5
        text-left
        transition-all

        ${
          selected
            ? "border-green-600 bg-green-50"
            : "border-zinc-200 bg-white hover:border-green-300 hover:shadow-md"
        }
      `}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
        <Icon
          className="text-green-600"
          size={24}
        />
      </div>

      <h3 className="font-semibold text-lg">
        {title}
      </h3>

      <p className="mt-2 text-sm text-zinc-500">
        {description}
      </p>
    </button>
  );
}
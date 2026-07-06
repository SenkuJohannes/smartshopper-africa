import Link from "next/link";
import { Plus } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description: string;
  buttonLabel?: string;
  buttonHref?: string;
}

export default function PageHeader({
  title,
  description,
  buttonLabel,
  buttonHref,
}: PageHeaderProps) {
  return (
    <div className="mb-10 flex flex-col gap-6 rounded-3xl bg-white p-8 shadow-sm md:flex-row md:items-center md:justify-between">

      <div>

        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {title}
        </h1>

        <p className="mt-2 max-w-2xl text-gray-500">
          {description}
        </p>

      </div>

      {buttonLabel && buttonHref && (
        <Link
          href={buttonHref}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-green-700 hover:shadow-lg"
        >
          <Plus size={20} />
          {buttonLabel}
        </Link>
      )}

    </div>
  );
}
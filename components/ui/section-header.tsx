import { ReactNode } from "react";

interface Props {
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function SectionHeader({
  title,
  description,
  action,
}: Props) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">
          {title}
        </h1>

        {description && (
          <p className="mt-2 text-zinc-500">
            {description}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}
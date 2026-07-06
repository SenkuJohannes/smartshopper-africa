import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  color?: "green" | "blue" | "orange" | "purple" | "gold";
}

export default function StatCard({
  title,
  value,
  description,
  icon,
  color = "green",
}: StatCardProps) {
  const colors = {
    green: "text-green-600 bg-green-50",
    blue: "text-blue-600 bg-blue-50",
    orange: "text-orange-600 bg-orange-50",
    purple: "text-purple-600 bg-purple-50",
    gold: "text-yellow-600 bg-yellow-50",
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-gray-900">
            {value}
          </h2>

          {description && (
            <p className="mt-3 text-sm text-gray-500">
              {description}
            </p>
          )}

        </div>

        {icon && (
          <div
            className={`rounded-2xl p-3 ${colors[color]}`}
          >
            {icon}
          </div>
        )}

      </div>

    </div>
  );
}
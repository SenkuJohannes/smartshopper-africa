import {
  MoreHorizontal,
  Pencil,
  Copy,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RuleCardProps {
  icon: string;
  title: string;
  when: string;
  then: string;
  status?:
    | "success"
    | "reward"
    | "offer"
    | "campaign"
    | "network"
    | "inactive";
}

export default function RuleCard({
  icon,
  title,
  when,
  then,
  status = "success",
}: RuleCardProps) {
  // Convert business status into a valid Badge variant
  const badgeVariant =
    status === "success"
      ? "success"
      : status === "inactive"
      ? "inactive"
      : "default";

  return (
    <Card className="rounded-3xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="text-4xl">{icon}</div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-xl p-2 hover:bg-gray-100">
              <MoreHorizontal size={18} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Copy className="mr-2 h-4 w-4" />
              Duplicate
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <h2 className="mt-6 text-xl font-bold">
        {title}
      </h2>

      <div className="mt-6">
        <p className="text-xs uppercase tracking-widest text-gray-400">
          WHEN
        </p>

        <p className="mt-2 font-medium">
          {when}
        </p>
      </div>

      <div className="mt-6">
        <p className="text-xs uppercase tracking-widest text-gray-400">
          THEN
        </p>

        <p className="mt-2 text-lg font-semibold text-green-600">
          {then}
        </p>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Badge variant={badgeVariant}>
          {status === "success" && "Active"}
          {status === "reward" && "Reward"}
          {status === "offer" && "Offer"}
          {status === "campaign" && "Campaign"}
          {status === "network" && "Network"}
          {status === "inactive" && "Inactive"}
        </Badge>
      </div>
    </Card>
  );
}
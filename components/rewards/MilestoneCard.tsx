import { Gift, Pencil, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface MilestoneCardProps {
  title: string;
  points: number;
  reward: string;
  active?: boolean;
  rewardType?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function MilestoneCard({
  title,
  points,
  reward,
  active = true,
  rewardType = "Discount",
  onEdit,
  onDelete,
}: MilestoneCardProps) {
  return (
    <Card className="rounded-3xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-2xl bg-green-100 p-3">
            <Gift className="text-green-600" size={24} />
          </div>

          <div>

            <h2 className="text-xl font-bold">
              {title}
            </h2>

            <p className="text-gray-500">
              {points} Points
            </p>

          </div>

        </div>

        <Badge variant={active ? "success" : "inactive"}>
          {active ? "Active" : "Inactive"}
        </Badge>

      </div>

      <div className="my-8 flex justify-center text-3xl">
        ↓
      </div>

      <div className="rounded-2xl bg-green-50 p-5 text-center">

        <p className="text-sm text-gray-500">
          Reward
        </p>

        <h3 className="mt-2 text-2xl font-bold text-green-700">
          {reward}
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          {rewardType}
        </p>

      </div>

      <div className="mt-8 flex gap-3">

        <Button
          variant="outline"
          className="flex-1"
          onClick={onEdit}
        >
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>

        <Button
          variant="destructive"
          className="flex-1"
          onClick={onDelete}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>

      </div>

    </Card>
  );
}
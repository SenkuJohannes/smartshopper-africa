import { Card, CardContent } from "@/components/ui/card";

interface Props {
  title: string;
  value: string | number;
}

export default function StatCard({
  title,
  value,
}: Props) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-6">
        <p className="text-sm text-gray-500">
          {title}
        </p>

        <h2 className="mt-3 text-4xl font-bold">
          {value}
        </h2>
      </CardContent>
    </Card>
  );
}
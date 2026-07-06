import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          SmartShopper Dashboard
        </h1>

        <p className="text-muted-foreground">
          Manage your loyalty program from one place.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm text-gray-500">Businesses</h3>
            <p className="mt-3 text-4xl font-bold">1</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm text-gray-500">Customers</h3>
            <p className="mt-3 text-4xl font-bold">0</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm text-gray-500">Rewards</h3>
            <p className="mt-3 text-4xl font-bold">0</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm text-gray-500">QR Scans</h3>
            <p className="mt-3 text-4xl font-bold">0</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Recent Activity
          </h2>

          <p className="text-gray-500">
            No activity yet.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
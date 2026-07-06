"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Business {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  subscription: string;
}

interface Props {
  businesses: Business[];
}

export default function BusinessCard({
  businesses,
}: Props) {
  return (
    <Card className="rounded-2xl">
      <CardContent className="p-6">

        <h2 className="text-xl font-bold mb-6">
          Your Businesses
        </h2>

        <div className="space-y-4">

          {businesses.map((business) => (
            <div
              key={business.id}
              className="border rounded-xl p-5"
            >
              <div className="flex justify-between">

                <div>
                  <h3 className="font-bold text-lg">
                    {business.name}
                  </h3>

                  <p className="text-gray-500">
                    {business.email}
                  </p>

                  <p className="text-gray-500">
                    {business.phone}
                  </p>
                </div>

                <div className="text-right">

                  <Badge>
                    {business.status}
                  </Badge>

                  <p className="mt-3 text-sm text-gray-500">
                    {business.subscription}
                  </p>

                </div>

              </div>
            </div>
          ))}

          {businesses.length === 0 && (
            <p className="text-gray-500">
              No businesses yet.
            </p>
          )}

        </div>

      </CardContent>
    </Card>
  );
}
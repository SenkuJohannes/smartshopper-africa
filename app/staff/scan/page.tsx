"use client";

import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { supabase } from "@/lib/supabase/client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StaffScannerPage() {
  const [loading, setLoading] = useState(false);
  const [membership, setMembership] = useState<any>(null);
  const [customer, setCustomer] = useState<any>(null);

  async function loadCard(cardNumber: string) {
    setLoading(true);

    try {
      // Find loyalty card
      const { data: card, error } = await supabase
        .from("loyalty_cards")
        .select("*")
        .eq("card_number", cardNumber)
        .single();

      if (error) throw error;

      // Find membership
      const {
        data: membershipData,
        error: membershipError,
      } = await supabase
        .from("customer_memberships")
        .select("*")
        .eq("customer_id", card.customer_id)
        .eq("program_id", card.program_id)
        .single();

      if (membershipError) throw membershipError;

      // Find customer
      const {
        data: customerData,
        error: customerError,
      } = await supabase
        .from("customers")
        .select("*")
        .eq("id", card.customer_id)
        .single();

      if (customerError) throw customerError;

      setMembership(membershipData);
      setCustomer(customerData);
    } catch (err) {
      console.error(err);
      alert("Customer not found.");
    } finally {
      setLoading(false);
    }
  }

  async function addPoints(points: number) {
    if (!membership) return;

    const newPoints = membership.current_points + points;

    console.log("Membership:", membership);
    console.log("Membership ID:", membership.id);
    console.log("Old Points:", membership.current_points);
    console.log("New Points:", newPoints);

    const { data, error } = await supabase
      .from("customer_memberships")
      .update({
        current_points: newPoints,
      })
      .eq("id", membership.id)
      .select();

    console.log("Update Result:", data);
    console.log("Update Error:", error);

    if (error) {
      alert(error.message);
      return;
    }

    if (!data || data.length === 0) {
      alert("No membership row was updated.");
      return;
    }

    setMembership(data[0]);

    alert(`${points} points added!`);
  }

  return (
    <main className="max-w-xl mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold">
        Staff Scanner
      </h1>

      {!membership && (
        <Scanner
          onScan={(results) => {
            if (!results.length) return;

            const value = results[0].rawValue;
            const cardNumber = value.split("/").pop();

            if (cardNumber) {
              loadCard(cardNumber);
            }
          }}
        />
      )}

      {loading && (
        <p>Loading customer...</p>
      )}

      {membership && customer && (
        <Card>
          <CardContent className="space-y-6 p-6">
            <h2 className="text-2xl font-bold">
              {customer.first_name} {customer.last_name}
            </h2>

            <div>
              <p className="text-gray-500">
                Member Number
              </p>
              <strong>{membership.member_number}</strong>
            </div>

            <div>
              <p className="text-gray-500">
                Current Points
              </p>

              <span className="text-4xl font-bold text-green-600">
                {membership.current_points}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button onClick={() => addPoints(5)}>
                +5 Points
              </Button>

              <Button onClick={() => addPoints(10)}>
                +10 Points
              </Button>

              <Button onClick={() => addPoints(20)}>
                +20 Points
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  setMembership(null);
                  setCustomer(null);
                }}
              >
                Scan Next
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
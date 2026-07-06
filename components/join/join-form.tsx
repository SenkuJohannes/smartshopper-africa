"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase/client";
import { joinProgram as joinLoyaltyProgram } from "@/lib/loyalty/join-program";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function JoinForm({
  joinCode,
}: {
  joinCode: string;
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  const [program, setProgram] = useState<any>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    loadProgram();
  }, []);

  async function loadProgram() {
    const { data, error } = await supabase
      .from("programs")
      .select("*")
      .eq("join_code", joinCode)
      .single();

    if (error) {
      console.error("Failed to load program:", error);
    }

    setProgram(data);
    setLoading(false);
  }

  async function joinProgram() {
    if (!program) return;

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !phone.trim()
    ) {
      alert("Please complete all fields.");
      return;
    }

    try {
      setJoining(true);

      const result = await joinLoyaltyProgram({
        firstName,
        lastName,
        email,
        phone,
        programId: program.id,
      });

      console.log("Join successful:", result);

      // Redirect directly to the customer's loyalty card
      router.push(`/card/${result.card.card_number}`);
    } catch (error: any) {
      console.error("Join failed:", error);

      alert(
        error?.message ??
          error?.error_description ??
          "Failed to join the loyalty program."
      );
    } finally {
      setJoining(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  if (!program) {
    return (
      <div className="text-center">
        Program not found.
      </div>
    );
  }

  return (
    <Card className="max-w-xl w-full rounded-3xl shadow-xl">
      <CardContent className="p-8">
        {program.banner_url && (
          <img
            src={program.banner_url}
            className="w-full h-48 object-cover rounded-2xl"
            alt={program.name}
          />
        )}

        <div className="flex justify-center -mt-10">
          <img
            src={
              program.logo_url ||
              "https://placehold.co/150x150"
            }
            className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-lg object-cover"
            alt={program.name}
          />
        </div>

        <h1 className="text-3xl font-bold text-center mt-4">
          {program.name}
        </h1>

        <p className="text-center text-gray-500 mt-2">
          {program.welcome_message || "Join our loyalty program"}
        </p>

        <div className="space-y-4 mt-8">
          <Input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <Input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <Button
            className="w-full h-12 text-lg"
            disabled={joining}
            onClick={joinProgram}
          >
            {joining ? "Joining..." : "Join Free"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
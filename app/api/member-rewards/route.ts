import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  try {
    const { membershipId } = await req.json();

    if (!membershipId) {
      return NextResponse.json(
        {
          error: "Membership ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("reward_unlocks")
      .select(`
        *,
        reward:reward_definitions(*)
      `)
      .eq("membership_id", membershipId)
      .eq("redeemed", false)
      .order("unlocked_at", {
        ascending: false,
      });

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(data);

  } catch {

    return NextResponse.json(
      {
        error: "Unexpected server error.",
      },
      {
        status: 500,
      }
    );

  }
}
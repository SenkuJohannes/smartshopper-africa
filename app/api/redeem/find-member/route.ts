import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { memberNumber } = await req.json();

    if (!memberNumber) {
      return NextResponse.json(
        { error: "Member number is required." },
        { status: 400 }
      );
    }

    // Find membership + customer
    const { data: membership, error: membershipError } =
      await supabaseAdmin
        .from("customer_memberships")
        .select(`
          *,
          customers (
            first_name,
            last_name,
            email
          )
        `)
        .eq("member_number", memberNumber)
        .single();

    if (membershipError || !membership) {
      return NextResponse.json(
        { error: "Member not found." },
        { status: 404 }
      );
    }

    // Load all rewards for this program
    const { data: rewards, error: rewardsError } =
      await supabaseAdmin
        .from("reward_definitions")
        .select("*")
        .eq("program_id", membership.program_id)
        .eq("active", true)
        .order("points_required");

    if (rewardsError) {
      return NextResponse.json(
        { error: rewardsError.message },
        { status: 500 }
      );
    }

    const customer = Array.isArray(membership.customers)
      ? membership.customers[0]
      : membership.customers;

    return NextResponse.json({
      success: true,

      memberNumber,

      customerName:
        `${customer?.first_name ?? ""} ${customer?.last_name ?? ""}`.trim(),

      email: customer?.email,

      currentPoints: membership.current_points,

      rewards,
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  try {
    const {
      memberNumber,
      rewardId,
    } = await req.json();

    // Find membership
    const { data: membership, error: membershipError } =
      await supabaseAdmin
        .from("customer_memberships")
        .select("*")
        .eq("member_number", memberNumber)
        .single();

    if (membershipError || !membership) {
      return NextResponse.json(
        { error: "Member not found." },
        { status: 404 }
      );
    }

    // Find reward
    const { data: reward, error: rewardError } =
      await supabaseAdmin
        .from("reward_definitions")
        .select("*")
        .eq("id", rewardId)
        .single();

    if (rewardError || !reward) {
      return NextResponse.json(
        { error: "Reward not found." },
        { status: 404 }
      );
    }

    if (
      membership.current_points <
      reward.points_required
    ) {
      return NextResponse.json(
        {
          error: "Not enough points.",
        },
        { status: 400 }
      );
    }

    const newBalance =
      membership.current_points -
      reward.points_required;

    // Update points
    const { error: updateError } =
      await supabaseAdmin
        .from("customer_memberships")
        .update({
          current_points: newBalance,
        })
        .eq("id", membership.id);

    if (updateError) {
      return NextResponse.json(
        {
          error: updateError.message,
        },
        { status: 500 }
      );
    }

    // Save redemption
    await supabaseAdmin
      .from("reward_redemptions")
      .insert({
        membership_id: membership.id,
        reward_definition_id: reward.id,
        points_used: reward.points_required,
        status: "redeemed",
      });

    // Save transaction
    await supabaseAdmin
      .from("loyalty_transactions")
      .insert({
        membership_id: membership.id,
        transaction_type: "redeem",
        points: reward.points_required,
        description: reward.title,
        reference: crypto.randomUUID(),
      });

    return NextResponse.json({
      success: true,
      currentPoints: newBalance,
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Unexpected server error.",
      },
      { status: 500 }
    );
  }
}
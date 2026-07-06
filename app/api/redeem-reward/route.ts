import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { unlockId } = await req.json();

    console.log("================================");
    console.log("Redeem Reward API");
    console.log("Unlock ID:", unlockId);

    if (!unlockId) {
      return NextResponse.json(
        { error: "Unlock ID is required." },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // Load unlocked reward
    // --------------------------------------------------

    const { data: unlock, error: unlockError } =
      await supabaseAdmin
        .from("reward_unlocks")
        .select(`
          *,
          reward:reward_id(*),
          membership:membership_id(*)
        `)
        .eq("id", unlockId)
        .single();

    console.log("Unlock:", unlock);
    console.log("Unlock Error:", unlockError);

    if (unlockError || !unlock) {
      return NextResponse.json(
        { error: "Reward not found." },
        { status: 404 }
      );
    }

    if (unlock.redeemed) {
      return NextResponse.json(
        { error: "Reward already redeemed." },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // Mark reward redeemed
    // --------------------------------------------------

    const { error: updateError } =
      await supabaseAdmin
        .from("reward_unlocks")
        .update({
          redeemed: true,
          redeemed_at: new Date().toISOString(),
        })
        .eq("id", unlockId);

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      );
    }

    // --------------------------------------------------
    // Create loyalty transaction
    // --------------------------------------------------

    const {
      data: transaction,
      error: transactionError,
    } = await supabaseAdmin
      .from("loyalty_transactions")
      .insert({
        membership_id: unlock.membership.id,
        transaction_type: "redeem",
        points: 0,
        description: `Redeemed: ${unlock.reward.title}`,
        balance_after: unlock.membership.current_points,
        reference: crypto.randomUUID(),
      })
      .select()
      .single();

    if (transactionError) {
      return NextResponse.json(
        {
          error: transactionError.message,
        },
        {
          status: 500,
        }
      );
    }

    // --------------------------------------------------
    // Save redemption history
    // --------------------------------------------------

    const { error: redemptionError } =
      await supabaseAdmin
        .from("reward_redemptions")
        .insert({
          loyalty_transaction_id: transaction.id,
          reward_definition_id: unlock.reward.id,
          membership_id: unlock.membership.id,
          redeemed_by: null,
          redeemed_at: new Date().toISOString(),
          notes: "Redeemed via Scanner",
        });

    if (redemptionError) {
      return NextResponse.json(
        {
          error: redemptionError.message,
        },
        {
          status: 500,
        }
      );
    }

    console.log("Reward redeemed successfully.");

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error(error);

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
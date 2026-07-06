import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { cardNumber } = await req.json();

    if (!cardNumber) {
      return NextResponse.json(
        {
          error: "Card number is required.",
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------------------------
    // Find Membership
    // --------------------------------------------------

    const { data: membership, error: membershipError } =
      await supabaseAdmin
        .from("customer_memberships")
        .select(`
          *,
          customers (
            first_name,
            last_name
          )
        `)
        .eq("card_number", cardNumber)
        .single();

    if (membershipError || !membership) {
      return NextResponse.json(
        {
          error: "Membership not found.",
        },
        {
          status: 404,
        }
      );
    }

    // --------------------------------------------------
    // Load Program Settings
    // --------------------------------------------------

    const { data: program, error: programError } =
      await supabaseAdmin
        .from("programs")
        .select(`
          points_per_visit,
          points_per_discount,
          discount_per_step,
          max_discount,
          reward_product,
          allow_save_points
        `)
        .eq("id", membership.program_id)
        .single();

    if (programError || !program) {
      return NextResponse.json(
        {
          error: "Program settings not found.",
        },
        {
          status: 404,
        }
      );
    }

    // --------------------------------------------------
    // Points to award
    // --------------------------------------------------

    const pointsToAward =
      program.points_per_visit ?? 10;

    const currentPoints =
      membership.current_points ?? 0;

    const lifetimePoints =
      membership.lifetime_points ?? 0;

    const visits =
      membership.visits_count ?? 0;

    const newCurrentPoints =
      currentPoints + pointsToAward;

    const newLifetimePoints =
      lifetimePoints + pointsToAward;

    const newVisits =
      visits + 1;

    // --------------------------------------------------
    // Update Membership
    // --------------------------------------------------

    const { error: updateError } =
      await supabaseAdmin
        .from("customer_memberships")
        .update({
          current_points: newCurrentPoints,
          lifetime_points: newLifetimePoints,
          visits_count: newVisits,
          last_visit_at: new Date().toISOString(),
        })
        .eq("id", membership.id);

    if (updateError) {
      return NextResponse.json(
        {
          error: updateError.message,
        },
        {
          status: 500,
        }
      );
    }

    // --------------------------------------------------
    // Save Transaction
    // --------------------------------------------------

    const { error: transactionError } =
      await supabaseAdmin
        .from("loyalty_transactions")
        .insert({
          membership_id: membership.id,
          transaction_type: "earn",
          points: pointsToAward,
          description: "Points Earned",
          balance_after: newCurrentPoints,
          reference: crypto.randomUUID(),
          created_by: null,
          metadata: {
            visit_number: newVisits,
            lifetime_points: newLifetimePoints,
            card_number: cardNumber,
          },
        });

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
    // Calculate Discount
    // --------------------------------------------------

    const pointsPerDiscount =
      program.points_per_discount ?? 100;

    const discountPerStep =
      program.discount_per_step ?? 10;

    const maxDiscount =
      program.max_discount ?? 100;

    const earnedSteps = Math.floor(
      newCurrentPoints / pointsPerDiscount
    );

    const availableDiscount = Math.min(
      earnedSteps * discountPerStep,
      maxDiscount
    );

    const pointsRequired =
      earnedSteps * pointsPerDiscount;

    const remainingPoints =
      newCurrentPoints - pointsRequired;

    const nextDiscount = Math.min(
      availableDiscount + discountPerStep,
      maxDiscount
    );

    const pointsUntilNext =
      availableDiscount >= maxDiscount
        ? 0
        : pointsPerDiscount - remainingPoints;

    // --------------------------------------------------
    // Customer
    // --------------------------------------------------

    const customer = Array.isArray(
      membership.customers
    )
      ? membership.customers[0]
      : membership.customers;

    // --------------------------------------------------
    // Response
    // --------------------------------------------------

    return NextResponse.json({
      success: true,

      cardNumber,

      customerName:
        `${customer?.first_name ?? ""} ${customer?.last_name ?? ""}`.trim(),

      pointsAwarded: pointsToAward,

      currentPoints: newCurrentPoints,

      lifetimePoints: newLifetimePoints,

      visits: newVisits,

      availableDiscount,

      pointsRequired,

      remainingPoints,

      nextDiscount,

      pointsUntilNext,

      rewardProduct:
        program.reward_product,

      allowSavePoints:
        program.allow_save_points,
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
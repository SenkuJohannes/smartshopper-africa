import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";


export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { data: transactions, error } = await supabaseAdmin
      .from("loyalty_transactions")
      .select("transaction_type, points, created_at")
      .gte("created_at", today.toISOString());

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

    const scansToday = transactions.filter(
      (t) => t.transaction_type === "earn"
    ).length;

    const pointsToday = transactions
      .filter((t) => t.transaction_type === "earn")
      .reduce((sum, t) => sum + (t.points ?? 0), 0);

    const redeemedToday = transactions.filter(
      (t) => t.transaction_type === "redeem"
    ).length;

    return NextResponse.json({
      scansToday,
      pointsToday,
      redeemedToday,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Unable to load scanner statistics.",
      },
      {
        status: 500,
      }
    );
  }
}
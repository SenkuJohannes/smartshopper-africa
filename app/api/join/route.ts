import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const {
      programId,
      firstName,
      lastName,
      phone,
      email,
    } = await req.json();

    if (!programId || !firstName || !lastName || !phone) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields.",
        },
        {
          status: 400,
        }
      );
    }

    const { data, error } = await supabaseAdmin.rpc(
      "register_customer_to_program",
      {
        p_program_id: programId,
        p_first_name: firstName,
        p_last_name: lastName,
        p_phone: phone,
        p_email: email ?? null,
      }
    );

    if (error) {
      console.error(error);

      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      registration: data[0],
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Unexpected server error.",
      },
      {
        status: 500,
      }
    );
  }
}
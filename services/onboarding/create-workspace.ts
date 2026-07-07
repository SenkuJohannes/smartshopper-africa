import { OnboardingData } from "@/contexts/onboarding-context";

import {
  createBusiness,
} from "@/services/business/create-business";

import {
  createBusinessMember,
} from "@/services/business/create-business-member";

import {
  createDefaultProgram,
} from "@/services/programs/create-default-program";

import { supabaseAdmin } from "@/lib/supabase/admin";

export interface WorkspaceResult {
  success: boolean;

  businessId?: string;

  programId?: string;

  joinCode?: string;

  slug?: string;

  error?: string;
}

export async function createWorkspace(
  profileId: string,
  data: OnboardingData
): Promise<WorkspaceResult> {
  let businessId: string | null = null;

  try {
    //
    // STEP 1
    // Create Business
    //

    const {
      business,
      joinCode,
      slug,
    } = await createBusiness({
      name: data.businessName,

      email: data.email,

      phone: data.phone,

      website: data.website,

      address: data.address,

      country: data.country,

      currency: data.currency,

      timezone: data.timezone,

      industry: data.industry,

      primaryColor: data.primaryColor,

      secondaryColor: data.secondaryColor,

      welcomeMessage: data.welcomeMessage,

      logo: data.logo,

      subscription: data.subscription,
    });

    businessId = business.id;

    //
    // STEP 2
    // Link Business Owner
    //

    await createBusinessMember({
      businessId: business.id,
      profileId,
      role: "owner",
    });

    //
    // STEP 3
    // Create Default Loyalty Program
    //

    const program = await createDefaultProgram({
      businessId: business.id,

      businessName: data.businessName,

      loyaltyType: data.loyaltyType,

      joinCode,

      welcomeMessage: data.welcomeMessage,

      primaryColor: data.primaryColor,

      secondaryColor: data.secondaryColor,

      website: data.website,

      phone: data.phone,

      address: data.address,

      logoUrl: data.logo,
    });

    //
    // SUCCESS
    //

    return {
      success: true,

      businessId: business.id,

      programId: program.id,

      joinCode,

      slug,
    };
  } catch (error) {
    //
    // Cleanup if something failed after creating the business
    //

    if (businessId) {
      await supabaseAdmin
        .from("businesses")
        .delete()
        .eq("id", businessId);
    }

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error",
    };
  }
}
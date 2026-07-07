import { createAuthUser } from "./create-auth-user";
import { createBusiness } from "./create-business";
import { createProgram } from "./create-program";
import { createScanner } from "./create-scanner";
import { createDefaultRewards } from "./create-default-rewards";

type CreateWorkspaceInput = {
  businessName: string;
  ownerName: string;

  email: string;
  password: string;
  phone: string;

  website: string;

  industry: string;

  country: string;
  currency: string;

  loyaltyType:
    | "points"
    | "visits"
    | "cashback"
    | "membership";

  primaryColor: string;
  secondaryColor: string;

  welcomeMessage: string;

  address: string;
};

export async function createWorkspace(
  input: CreateWorkspaceInput
) {
  try {
    // ==========================================
    // STEP 1 - Create Auth User
    // ==========================================

    const user = await createAuthUser({
      email: input.email,
      password: input.password,
      ownerName: input.ownerName,
    });

    // ==========================================
    // STEP 2 - Create Business
    // ==========================================

    const business = await createBusiness({
      ownerId: user.id,

      businessName: input.businessName,

      email: input.email,
      phone: input.phone,

      website: input.website,

      industry: input.industry,

      country: input.country,
      currency: input.currency,

      primaryColor: input.primaryColor,
      secondaryColor: input.secondaryColor,
    });

    // ==========================================
    // STEP 3 - Create Loyalty Program
    // ==========================================

    const program = await createProgram({
      businessId: business.id,

      name: `${input.businessName} Rewards`,

      loyaltyType: input.loyaltyType,

      primaryColor: input.primaryColor,
      secondaryColor: input.secondaryColor,

      welcomeMessage: input.welcomeMessage,

      website: input.website,

      phone: input.phone,

      address: input.address,
    });

    // ==========================================
    // STEP 4 - Create Default Scanner
    // ==========================================

    const scanner = await createScanner({
      businessId: business.id,
      programId: program.id,
    });

    // ==========================================
    // STEP 5 - Create Default Rewards
    // ==========================================

    const rewards = await createDefaultRewards({
      programId: program.id,
    });

    // ==========================================
    // SUCCESS
    // ==========================================

    return {
      success: true,

      user,
      business,
      program,
      scanner,
      rewards,
    };
  } catch (error) {
    console.error("Workspace creation failed:", error);

    throw error;
  }
}
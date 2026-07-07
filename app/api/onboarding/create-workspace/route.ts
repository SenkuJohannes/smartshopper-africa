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
  const started = Date.now();

  console.log("🚀 Starting SmartShopper workspace creation...");
  console.log("Business:", input.businessName);
  console.log("Owner:", input.ownerName);
  console.log("Email:", input.email);

  try {
    // ==========================================
    // STEP 1 - Create Auth User
    // ==========================================

    console.log("① Creating Auth user...");

    const user = await createAuthUser({
      email: input.email,
      password: input.password,
      ownerName: input.ownerName,
    });

    console.log("✅ Auth user created:", user.id);

    // ==========================================
    // STEP 2 - Create Business
    // ==========================================

    console.log("② Creating business...");

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

    console.log("✅ Business created:", business.id);

    // ==========================================
    // STEP 3 - Create Program
    // ==========================================

    console.log("③ Creating loyalty program...");

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

    console.log("✅ Program created:", program.id);

    // ==========================================
    // STEP 4 - Create Scanner
    // ==========================================

    console.log("④ Creating scanner...");

    const scanner = await createScanner({
      businessId: business.id,
      programId: program.id,
    });

    console.log("✅ Scanner created:", scanner.id);

    // ==========================================
    // STEP 5 - Create Rewards
    // ==========================================

    console.log("⑤ Creating default rewards...");

    const rewards = await createDefaultRewards({
      programId: program.id,
    });

    console.log(`✅ ${rewards.length} rewards created`);

    console.log(
      `🎉 Workspace created successfully in ${
        Date.now() - started
      }ms`
    );

    return {
      success: true,
      user,
      business,
      program,
      scanner,
      rewards,
    };
  } catch (error) {
    console.error("❌ Workspace creation failed");
    console.error(error);

    throw error;
  }
}
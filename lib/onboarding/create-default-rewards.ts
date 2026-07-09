import { supabaseAdmin } from "@/lib/supabase/admin";

type CreateDefaultRewardsInput = {
  programId: string;
};

export async function createDefaultRewards({
  programId,
}: CreateDefaultRewardsInput) {
  const rewards = [
    {
      title: "5% Discount",
      description: "Get 5% off your purchase.",
      points_required: 100,
      reward_type: "discount",
    },
    {
      title: "10% Discount",
      description: "Get 10% off your purchase.",
      points_required: 500,
      reward_type: "discount",
    },
    {
      title: "15% Discount",
      description: "Get 15% off your purchase.",
      points_required: 1000,
      reward_type: "discount",
    },
    {
      title: "20% Discount",
      description: "Get 20% off your purchase.",
      points_required: 2000,
      reward_type: "discount",
    },
    {
      title: "Free Product",
      description: "Redeem one free product.",
      points_required: 5000,
      reward_type: "free_item",
    },
  ].map((reward) => ({
    ...reward,
    program_id: programId,
  }));

  const { data, error } = await supabaseAdmin
    .from("reward_definitions")
    .insert(rewards)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
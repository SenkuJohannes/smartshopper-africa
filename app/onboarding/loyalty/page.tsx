"use client";

import {
  Star,
  MapPin,
  Wallet,
  Crown,
} from "lucide-react";

import { useRouter } from "next/navigation";

import StepLayout from "@/components/onboarding/step-layout";
import Navigation from "@/components/onboarding/navigation";

import { useOnboarding } from "@/contexts/onboarding-context";

type Option = {
  id: "points" | "visits" | "cashback" | "membership";
  title: string;
  description: string;
  icon: React.ElementType;
};

export default function LoyaltyPage() {
  const router = useRouter();

  const { data, update } = useOnboarding();

  const recommended = recommendation(data.industry);

  const options: Option[] = [
    {
      id: "points",
      title: "Points",
      description:
        "Customers earn points every time they make a purchase.",
      icon: Star,
    },
    {
      id: "visits",
      title: "Visits",
      description:
        "Reward customers for returning frequently.",
      icon: MapPin,
    },
    {
      id: "cashback",
      title: "Cashback",
      description:
        "Give customers store credit on purchases.",
      icon: Wallet,
    },
    {
      id: "membership",
      title: "VIP Membership",
      description:
        "Offer exclusive member tiers and benefits.",
      icon: Crown,
    },
  ];

  function continueToReview() {
    if (!data.loyaltyType) {
      alert("Please choose a loyalty program.");
      return;
    }

    router.push("/onboarding/review");
  }

  return (
    <StepLayout
      step={5}
      title="Choose your loyalty program"
      description="We'll build everything around this choice."
      navigation={
        <Navigation
          back="/onboarding/branding"
          nextLabel="Continue"
          onNext={continueToReview}
        />
      }
    >
      <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4">
        <p className="font-medium text-green-800">
          Recommended for your business
        </p>

        <p className="mt-2 text-sm text-green-700">
          Based on your industry, we recommend{" "}
          <strong>{recommended.title}</strong>.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {options.map((option) => {
          const Icon = option.icon;

          const active = data.loyaltyType === option.id;

          return (
            <button
              key={option.id}
              onClick={() =>
                update({
                  loyaltyType: option.id,
                })
              }
              className={`
                rounded-2xl
                border-2
                p-6
                text-left
                transition-all
                hover:border-green-500
                hover:shadow-md

                ${
                  active
                    ? "border-green-600 bg-green-50"
                    : "border-zinc-200 bg-white"
                }
              `}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                <Icon
                  className="text-green-600"
                  size={24}
                />
              </div>

              <h2 className="text-xl font-semibold">
                {option.title}
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                {option.description}
              </p>

              {recommended.id === option.id && (
                <span className="mt-4 inline-block rounded-full bg-green-600 px-3 py-1 text-xs font-medium text-white">
                  Recommended
                </span>
              )}
            </button>
          );
        })}
      </div>
    </StepLayout>
  );
}

function recommendation(industry: string) {
  switch (industry) {
    case "Coffee Shop":
    case "Restaurant":
      return {
        id: "points",
        title: "Points",
      };

    case "Salon":
      return {
        id: "visits",
        title: "Visits",
      };

    case "Gym":
      return {
        id: "membership",
        title: "VIP Membership",
      };

    default:
      return {
        id: "points",
        title: "Points",
      };
  }
}
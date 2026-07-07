"use client";

import { useRouter } from "next/navigation";

import StepLayout from "@/components/onboarding/step-layout";
import Navigation from "@/components/onboarding/navigation";
import { useOnboarding } from "@/contexts/onboarding-context";

export default function BrandingPage() {
  const router = useRouter();
  const { data, update } = useOnboarding();

  return (
    <StepLayout
      step={4}
      title="Brand Your Loyalty Program"
      description="Customize how your loyalty card will look to customers."
      navigation={
        <Navigation
          back="/onboarding/account"
          nextLabel="Continue"
          onNext={() => router.push("/onboarding/loyalty")}
        />
      }
    >
      <div className="space-y-6">

        <div>
          <label className="mb-2 block font-medium">
            Business Logo
          </label>

          <input
            type="file"
            className="w-full rounded-xl border p-3"
          />

          <p className="mt-2 text-sm text-zinc-500">
            You'll be able to change this later from your dashboard.
          </p>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Primary Colour
          </label>

          <input
            type="color"
            value={data.primaryColor}
            onChange={(e) =>
              update({
                primaryColor: e.target.value,
              })
            }
            className="h-12 w-24 rounded-lg border"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Welcome Message
          </label>

          <textarea
            rows={4}
            value={data.welcomeMessage}
            onChange={(e) =>
              update({
                welcomeMessage: e.target.value,
              })
            }
            className="w-full rounded-xl border p-3"
            placeholder="Welcome to our loyalty program!"
          />
        </div>

      </div>
    </StepLayout>
  );
}
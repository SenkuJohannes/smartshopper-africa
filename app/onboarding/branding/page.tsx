"use client";

import StepLayout from "@/components/onboarding/step-layout";
import Navigation from "@/components/onboarding/navigation";

export default function BrandingPage() {
  return (
    <StepLayout
      step={5}
      title="Brand Your Loyalty Program"
      description="Customize how your loyalty card will look to customers."
      navigation={
        <Navigation
          back="/onboarding/campaigns"
          next="/onboarding/review"
        />
      }
    >
      <div className="space-y-6">

        <div>
          <label className="block mb-2 font-medium">
            Business Logo
          </label>

          <input
            type="file"
            className="w-full border rounded-xl p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Primary Colour
          </label>

          <input
            type="color"
            defaultValue="#16a34a"
            className="h-12 w-24 rounded-lg border"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Welcome Message
          </label>

          <textarea
            className="w-full border rounded-xl p-3"
            rows={4}
            placeholder="Welcome to our loyalty program!"
          />
        </div>

      </div>
    </StepLayout>
  );
}
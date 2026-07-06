"use client";

import { useRouter } from "next/navigation";
import StepLayout from "@/components/onboarding/step-layout";
import { Button } from "@/components/ui/button";

export default function ReviewPage() {
  const router = useRouter();

  return (
    <StepLayout
      step={6}
      title="You're Ready to Launch!"
      description="Your loyalty program has been configured successfully."
      navigation={<div />}
    >
      <div className="space-y-6">

        <div className="rounded-2xl border bg-green-50 p-6">

          <h2 className="text-2xl font-bold text-green-700">
            🎉 Congratulations!
          </h2>

          <p className="mt-2 text-gray-600">
            Your SmartShopper loyalty program is ready.
          </p>

        </div>

        <div className="rounded-2xl border bg-white p-6">

          <h3 className="text-xl font-semibold mb-4">
            Setup Summary
          </h3>

          <div className="space-y-3">

            <div>✅ Business Created</div>

            <div>✅ Loyalty Program Configured</div>

            <div>✅ Earning Rules Added</div>

            <div>✅ Rewards Created</div>

            <div>✅ Branding Complete</div>

            <div>✅ QR Codes Ready</div>

            <div>✅ Customer Loyalty Cards Ready</div>

            <div>✅ Scanner Ready</div>

          </div>

        </div>

        <div className="rounded-2xl border bg-slate-50 p-6">

          <h3 className="text-lg font-semibold">
            What's Next?
          </h3>

          <ul className="mt-4 space-y-2 text-gray-600">
            <li>• Invite your first customers.</li>
            <li>• Display your QR code in-store.</li>
            <li>• Start awarding loyalty points.</li>
            <li>• Connect your SmartShopper Scanner.</li>
          </ul>

        </div>

        <Button
          className="w-full h-12 text-lg"
          onClick={() => router.push("/dashboard")}
        >
          🚀 Launch Dashboard
        </Button>

      </div>
    </StepLayout>
  );
}
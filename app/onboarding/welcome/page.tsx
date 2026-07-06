"use client";

"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Progress from "@/components/ui/progress";
import WizardCard from "@/components/onboarding/wizard-card";
import StepHeader from "@/components/onboarding/step-header";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <WizardCard>
      <Progress current={1} total={6} />

      <StepHeader
        title="Welcome to SmartShopper"
        description="Let's create your loyalty platform in just a few minutes."
      />

      <div className="space-y-5">
        <Feature text="Create your business workspace" />

        <Feature text="Generate your first loyalty program" />

        <Feature text="Set up rewards automatically" />

        <Feature text="Generate QR codes" />

        <Feature text="Enable Apple & Google Wallet" />
      </div>

      <div className="mt-12 flex justify-end">
        <Button
          onClick={() => router.push("/onboarding/business")}
        >
          Let's Begin

          <ArrowRight
            size={18}
            className="ml-2"
          />
        </Button>
      </div>
    </WizardCard>
  );
}

function Feature({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-zinc-200 p-4">
      <CheckCircle2
        className="text-green-600"
        size={22}
      />

      <span className="text-zinc-700">
        {text}
      </span>
    </div>
  );
}
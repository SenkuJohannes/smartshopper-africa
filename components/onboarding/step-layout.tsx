import { ReactNode } from "react";

import Progress from "@/components/ui/progress";
import WizardCard from "@/components/onboarding/wizard-card";
import StepHeader from "@/components/onboarding/step-header";

interface Props {
  step: number;
  title: string;
  description: string;
  children: ReactNode;
  navigation: ReactNode;
}

export default function StepLayout({
  step,
  title,
  description,
  children,
  navigation,
}: Props) {
  return (
    <WizardCard>
      <Progress
        current={step}
        total={6}
      />

      <StepHeader
        title={title}
        description={description}
      />

      <div className="space-y-6">
        {children}
      </div>

      {navigation}
    </WizardCard>
  );
}
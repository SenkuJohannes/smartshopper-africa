import { ReactNode } from "react";

import PageContainer from "@/components/ui/page-container";
import { OnboardingProvider } from "@/contexts/onboarding-context";

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <OnboardingProvider>
      <PageContainer>
        {children}
      </PageContainer>
    </OnboardingProvider>
  );
}
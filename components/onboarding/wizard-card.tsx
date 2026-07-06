import { ReactNode } from "react";

import { Card } from "@/components/ui/card";

interface Props {
  children: ReactNode;
}

export default function WizardCard({
  children,
}: Props) {
  return (
    <Card className="mx-auto max-w-3xl p-10">
      {children}
    </Card>
  );
}
import { ReactNode } from "react";
import { Card } from "./card";

interface Props {
  children: ReactNode;
}

export default function StepCard({
  children,
}: Props) {
  return (
    <Card className="p-8">
      {children}
    </Card>
  );
}
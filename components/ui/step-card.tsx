import Card from "./card";

interface Props {
  children: React.ReactNode;
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
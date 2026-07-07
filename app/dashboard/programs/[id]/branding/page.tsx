import BrandingForm from "@/components/branding/branding-form";
import LoyaltyCard from "@/components/loyalty-card/loyalty-card";

export default async function BrandingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <BrandingForm programId={id} />;
}
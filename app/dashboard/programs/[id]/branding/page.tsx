import BrandingForm from "@/components/branding/branding-form";

export default async function BrandingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <BrandingForm programId={id} />;
}
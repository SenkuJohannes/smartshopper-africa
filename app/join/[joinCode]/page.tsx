// app/join/[joinCode]/page.tsx

import JoinForm from "@/components/join/join-form";

export default async function JoinPage({
  params,
}: {
  params: Promise<{ joinCode: string }>;
}) {
  const { joinCode } = await params;

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-8">
      <JoinForm joinCode={joinCode} />
    </main>
  );
}
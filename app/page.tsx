import { supabase } from "@/lib/supabase/client";

export default async function Home() {
  const { data: businesses, error } = await supabase
    .from("businesses")
    .select("*");

  return (
    <main style={{ padding: 40 }}>
      <h1>SmartShopper Africa</h1>

      <h2>Businesses</h2>

      <pre>
        {JSON.stringify({ businesses, error }, null, 2)}
      </pre>
    </main>
  );
}
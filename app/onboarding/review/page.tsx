"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import StepLayout from "@/components/onboarding/step-layout";
import { Button } from "@/components/ui/button";

import { useOnboarding } from "@/contexts/onboarding-context";

export default function ReviewPage() {
  const router = useRouter();

  const { data } = useOnboarding();

  const [creating, setCreating] = useState(false);

  async function createWorkspace() {
    setCreating(true);

    try {
      const response = await fetch(
        "/api/onboarding/create-workspace",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || "Failed to create workspace.");
        return;
      }

      console.log(result);

      alert("Workspace request received successfully!");

      // Temporary
      // Later this will redirect automatically
      // after the workspace is fully created.
      router.push("/login");
    } catch (error) {
      console.error(error);

      alert("Something went wrong.");
    } finally {
      setCreating(false);
    }
  }

  return (
    <StepLayout
      step={6}
      title="You're Ready to Launch!"
      description="Your loyalty program has been configured successfully."
      navigation={<div />}
    >
      <div className="space-y-6">
        <div className="rounded-2xl border bg-green-50 p-6">
          <h2 className="text-2xl font-bold text-green-700">
            🎉 Congratulations!
          </h2>

          <p className="mt-2 text-gray-600">
            Your SmartShopper loyalty program is ready.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6">
          <h3 className="text-xl font-semibold mb-4">
            Setup Summary
          </h3>

          <div className="space-y-3">
            <div>✅ Business Information Complete</div>

            <div>✅ Loyalty Program Selected</div>

            <div>✅ Branding Configured</div>

            <div>✅ Ready to Create Workspace</div>
          </div>
        </div>

        <div className="rounded-2xl border bg-slate-50 p-6">
          <h3 className="text-lg font-semibold">
            What's Next?
          </h3>

          <ul className="mt-4 space-y-2 text-gray-600">
            <li>• Your SmartShopper workspace will be created.</li>

            <li>• Your business account will be prepared.</li>

            <li>• Your loyalty program will be generated.</li>

            <li>• Your cashier scanner will be created.</li>

            <li>• You'll then sign in to your dashboard.</li>
          </ul>
        </div>

        <Button
          className="w-full h-12 text-lg"
          disabled={creating}
          onClick={createWorkspace}
        >
          {creating
            ? "Creating Workspace..."
            : "🚀 Create Workspace"}
        </Button>
      </div>
    </StepLayout>
  );
}
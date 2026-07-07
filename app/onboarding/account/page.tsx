"use client";

import { useRouter } from "next/navigation";

import StepLayout from "@/components/onboarding/step-layout";
import Navigation from "@/components/onboarding/navigation";
import { useOnboarding } from "@/contexts/onboarding-context";

export default function AccountPage() {
  const router = useRouter();

  const { data, update } = useOnboarding();

  function continueToBranding() {
    if (!data.email.trim()) {
      alert("Business email is required.");
      return;
    }

    if (!data.password.trim()) {
      alert("Please create a password.");
      return;
    }

    if (data.password.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }

    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    router.push("/onboarding/branding");
  }

  return (
    <StepLayout
      step={3}
      title="Create your SmartShopper account"
      description="These details will be used to sign in to your dashboard."
      navigation={
        <Navigation
          back="/onboarding/business"
          nextLabel="Continue"
          onNext={continueToBranding}
        />
      }
    >
      <div className="space-y-6">

        <div>
          <label className="mb-2 block text-sm font-medium">
            Business Email
          </label>

          <input
            type="email"
            value={data.email}
            readOnly
            className="w-full rounded-xl border border-zinc-300 bg-zinc-100 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Password
          </label>

          <input
            type="password"
            placeholder="Create a password"
            value={data.password}
            onChange={(e) =>
              update({
                password: e.target.value,
              })
            }
            className="w-full rounded-xl border border-zinc-300 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Confirm password"
            value={data.confirmPassword}
            onChange={(e) =>
              update({
                confirmPassword: e.target.value,
              })
            }
            className="w-full rounded-xl border border-zinc-300 p-3"
          />
        </div>

        <div className="rounded-2xl bg-green-50 border border-green-200 p-5">
          <h3 className="font-semibold text-green-800">
            Your account includes
          </h3>

          <ul className="mt-3 space-y-2 text-green-700 text-sm">
            <li>✅ Secure business login</li>
            <li>✅ Your own private dashboard</li>
            <li>✅ Loyalty management</li>
            <li>✅ Customer database</li>
            <li>✅ QR scanners</li>
            <li>✅ Apple & Google Wallet support</li>
          </ul>
        </div>

      </div>
    </StepLayout>
  );
}
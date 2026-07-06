"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RuleBuilder() {
  const [step, setStep] = useState(1);

  return (
    <Card className="rounded-3xl p-8">

      {/* Progress */}

      <div className="mb-10">

        <div className="mb-3 flex justify-between text-sm text-gray-500">

          <span>Step {step} of 4</span>

          <span>{Math.round((step / 4) * 100)}%</span>

        </div>

        <div className="h-2 rounded-full bg-gray-200">

          <div
            className="h-2 rounded-full bg-green-600 transition-all"
            style={{
              width: `${(step / 4) * 100}%`,
            }}
          />

        </div>

      </div>

      {/* Step 1 */}

      {step === 1 && (

        <>

          <h2 className="text-2xl font-bold">
            What triggers this rule?
          </h2>

          <p className="mt-2 text-gray-500">
            Choose what starts the rule.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">

            {[
              "Purchase",
              "Visit",
              "Birthday",
              "Referral",
              "Campaign",
              "Anniversary",
            ].map((item) => (

              <button
                key={item}
                className="rounded-2xl border p-6 text-left transition hover:border-green-500 hover:bg-green-50"
              >
                <h3 className="font-semibold">
                  {item}
                </h3>
              </button>

            ))}

          </div>

        </>

      )}

      {/* Navigation */}

      <div className="mt-10 flex justify-between">

        <Button
          variant="outline"
          disabled={step === 1}
          onClick={() => setStep(step - 1)}
        >
          Previous
        </Button>

        <Button
          onClick={() => {
            if (step < 4) {
              setStep(step + 1);
            }
          }}
        >
          {step === 4 ? "Finish" : "Next"}
        </Button>

      </div>

    </Card>
  );
}
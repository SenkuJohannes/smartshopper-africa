"use client";

import { useRouter } from "next/navigation";

import StepLayout from "@/components/onboarding/step-layout";
import Navigation from "@/components/onboarding/navigation";
import { useOnboarding } from "@/contexts/onboarding-context";

const countries = [
  { name: "South Africa", currency: "ZAR" },
  { name: "Botswana", currency: "BWP" },
  { name: "Namibia", currency: "NAD" },
  { name: "Zimbabwe", currency: "USD" },
  { name: "Zambia", currency: "ZMW" },
  { name: "Kenya", currency: "KES" },
];

export default function BusinessPage() {
  const router = useRouter();

  const { data, update } = useOnboarding();

  function handleCountryChange(country: string) {
    const selected = countries.find((c) => c.name === country);

    update({
      country,
      currency: selected?.currency ?? "",
    });
  }

  return (
    <StepLayout
      step={2}
      title="Tell us about your business"
      description="We'll personalise SmartShopper for your business."
      navigation={
        <Navigation
          back="/onboarding/welcome"
          nextLabel="Continue"
          onNext={() => router.push("/onboarding/loyalty")}
        />
      }
    >
      {/* Business Information */}

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm font-medium">
            Business Name
          </label>

          <input
            className="w-full rounded-xl border border-zinc-300 p-3"
            placeholder="Bluelemo Spree"
            value={data.businessName}
            onChange={(e) =>
              update({
                businessName: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Owner Name
          </label>

          <input
            className="w-full rounded-xl border border-zinc-300 p-3"
            placeholder="John Smith"
            value={data.ownerName}
            onChange={(e) =>
              update({
                ownerName: e.target.value,
              })
            }
          />
        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm font-medium">
            Business Email
          </label>

          <input
            type="email"
            className="w-full rounded-xl border border-zinc-300 p-3"
            placeholder="info@business.com"
            value={data.email}
            onChange={(e) =>
              update({
                email: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Phone Number
          </label>

          <input
            className="w-full rounded-xl border border-zinc-300 p-3"
            placeholder="+27..."
            value={data.phone}
            onChange={(e) =>
              update({
                phone: e.target.value,
              })
            }
          />
        </div>

      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Website
        </label>

        <input
          className="w-full rounded-xl border border-zinc-300 p-3"
          placeholder="https://yourbusiness.com"
          value={data.website}
          onChange={(e) =>
            update({
              website: e.target.value,
            })
          }
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Business Category
        </label>

        <select
          className="w-full rounded-xl border border-zinc-300 p-3"
          value={data.industry}
          onChange={(e) =>
            update({
              industry: e.target.value,
            })
          }
        >
          <option value="">Select a category...</option>
          <option value="Retail">Retail</option>
          <option value="Restaurant">Restaurant</option>
          <option value="Coffee Shop">Coffee Shop</option>
          <option value="Salon">Salon</option>
          <option value="Barber">Barber</option>
          <option value="Gym">Gym</option>
          <option value="Hotel">Hotel</option>
          <option value="Pharmacy">Pharmacy</option>
          <option value="Supermarket">Supermarket</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-3">

        <div>
          <label className="mb-2 block text-sm font-medium">
            Country
          </label>

          <select
            className="w-full rounded-xl border border-zinc-300 p-3"
            value={data.country}
            onChange={(e) =>
              handleCountryChange(e.target.value)
            }
          >
            <option value="">Select Country</option>

            {countries.map((country) => (
              <option
                key={country.name}
                value={country.name}
              >
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Currency
          </label>

          <input
            readOnly
            className="w-full rounded-xl border border-zinc-300 bg-zinc-100 p-3"
            value={data.currency}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Locations
          </label>

          <input
            type="number"
            min={1}
            className="w-full rounded-xl border border-zinc-300 p-3"
            value={data.locations}
            onChange={(e) =>
              update({
                locations: Number(e.target.value),
              })
            }
          />
        </div>

      </div>

    </StepLayout>
  );
}
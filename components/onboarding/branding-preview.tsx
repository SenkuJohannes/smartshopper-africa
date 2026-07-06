"use client";

interface Props {
  businessName: string;
  primaryColor: string;
  secondaryColor: string;
  welcomeMessage: string;
}

export default function BrandingPreview({
  businessName,
  primaryColor,
  secondaryColor,
  welcomeMessage,
}: Props) {
  return (
    <div
      className="overflow-hidden rounded-3xl shadow-lg"
      style={{
        background: primaryColor,
        color: secondaryColor,
      }}
    >
      <div className="p-8">

        <h2 className="text-2xl font-bold">
          {businessName || "Your Business"}
        </h2>

        <p className="mt-4 opacity-90">
          {welcomeMessage || "Welcome to SmartShopper"}
        </p>

        <div className="mt-10 flex items-end justify-between">

          <div>

            <p className="text-sm opacity-80">
              Loyalty Points
            </p>

            <h1 className="text-5xl font-bold">
              120
            </h1>

          </div>

          <div className="rounded-xl bg-white/20 p-5">

            QR

          </div>

        </div>

      </div>
    </div>
  );
}
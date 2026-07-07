type Props = {
  program: any;
};

export default function LoyaltyCardFooter({
  program,
}: Props) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl">
      <h3 className="mb-6 text-xl font-bold text-gray-900">
        ☕ Visit Us
      </h3>

      <div className="space-y-5">
        {program?.website && (
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-xl">
              🌍
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Website
              </p>

              <p className="font-semibold break-all">
                {program.website}
              </p>
            </div>
          </div>
        )}

        {program?.business_phone && (
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-xl">
              ☎️
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Phone
              </p>

              <p className="font-semibold">
                {program.business_phone}
              </p>
            </div>
          </div>
        )}

        {program?.business_address && (
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-xl">
              📍
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Address
              </p>

              <p className="font-semibold">
                {program.business_address}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 rounded-2xl bg-slate-50 p-5 text-center">
        <p className="text-sm text-gray-500">
          Thanks for supporting
        </p>

        <h4 className="mt-2 text-lg font-bold">
          {program?.name}
        </h4>

        <p className="mt-2 text-sm text-gray-500">
          We appreciate every visit. See you again soon! ☕
        </p>
      </div>
    </div>
  );
}
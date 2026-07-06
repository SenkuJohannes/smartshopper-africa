type Props = {
  program: any;
  customer: any;
  membership: any;
};

export default function LoyaltyCardHeader({
  program,
  customer,
  membership,
}: Props) {
  const memberSince = membership?.created_at
    ? new Date(membership.created_at).toLocaleDateString("en-ZA", {
        month: "short",
        year: "numeric",
      })
    : "Recently";

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">

      {/* Banner */}
      <div className="relative h-52">

        {program?.banner_url ? (
          <img
            src={program.banner_url}
            alt={program?.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg,
                ${program?.primary_color || "#16a34a"} 0%,
                ${program?.primary_color || "#15803d"} 100%)`,
            }}
          />
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/35" />

        {/* Logo */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2">

          <div className="h-28 w-28 rounded-full border-4 border-white bg-white shadow-xl overflow-hidden">

            <img
              src={
                program?.logo_url ||
                "https://placehold.co/120x120?text=Logo"
              }
              alt={program?.name}
              className="h-full w-full object-cover"
            />

          </div>

        </div>

      </div>

      {/* Content */}
      <div className="px-8 pt-20 pb-8 text-center">

        <h1 className="text-3xl font-bold text-gray-900">
          {program?.name}
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          {program?.welcome_message || "Welcome back!"}
        </p>

        <div className="mt-6 inline-flex items-center rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700">

          📅 Member since {memberSince}

        </div>

        <div className="mt-8">

          <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
            Member
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            {customer?.first_name} {customer?.last_name}
          </h2>

        </div>

      </div>

    </div>
  );
}
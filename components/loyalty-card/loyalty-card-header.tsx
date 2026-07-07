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

  const primaryColor =
    program?.primary_color || "#16a34a";

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
      {/* Banner */}
      <div className="relative h-56">
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
                ${primaryColor} 0%,
                ${primaryColor}CC 100%)`,
            }}
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Business Name */}
        <div className="absolute left-6 top-6 text-white">
          <p className="text-xs uppercase tracking-[0.3em] opacity-80">
            SMARTSHOPPER REWARDS
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            {program?.name}
          </h1>
        </div>

        {/* Logo */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2">
          <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-white shadow-xl">
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

      {/* Card Content */}
      <div className="px-8 pb-8 pt-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          {customer?.first_name} {customer?.last_name}
        </h2>

        <p className="mt-3 text-gray-500">
          {program?.welcome_message ||
            "Welcome back! Thanks for being a loyal customer."}
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <div
            className="rounded-full px-4 py-2 text-sm font-semibold text-white"
            style={{
              backgroundColor: primaryColor,
            }}
          >
            ⭐ Loyalty Member
          </div>

          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
            📅 Since {memberSince}
          </div>
        </div>
      </div>
    </div>
  );
}
import Link from "next/link";

export default async function ProgramLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const navItems = [
    {
      name: "Overview",
      href: `/dashboard/programs/${id}`,
    },
    {
      name: "Rewards",
      href: `/dashboard/programs/${id}/rewards`,
    },
    {
      name: "QR Codes",
      href: `/dashboard/programs/${id}/qr`,
    },
    {
      name: "Customers",
      href: `/dashboard/programs/${id}/customers`,
    },
    {
      name: "Transactions",
      href: `/dashboard/programs/${id}/transactions`,
    },
    {
      name: "Earning Rules",
      href: `/dashboard/programs/${id}/earning-rules`,
    },
    {
      name: "Campaigns",
      href: `/dashboard/programs/${id}/campaigns`,
    },
    {
      name: "Scanners",
      href: `/dashboard/programs/${id}/scanners`,
    },
    {
      name: "Branding ⭐",
      href: `/dashboard/programs/${id}/branding`,
    },
    {
      name: "Settings",
      href: `/dashboard/programs/${id}/settings`,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <h1 className="text-3xl font-bold text-slate-900">
            Loyalty Program
          </h1>

          <nav className="mt-6 flex flex-wrap gap-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-slate-600 transition-colors hover:text-green-600"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Page Content */}
      <main className="max-w-7xl mx-auto p-8">
        {children}
      </main>
    </div>
  );
}
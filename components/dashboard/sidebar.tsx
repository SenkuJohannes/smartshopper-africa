"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Gift,
  QrCode,
  Wallet,
  BarChart3,
  Settings,
  Star,
} from "lucide-react";

const links = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Customers",
    href: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Programs",
    href: "/dashboard/programs",
    icon: Star,
  },
  {
    title: "Rewards",
    href: "/dashboard/rewards",
    icon: Gift,
  },
  {
    title: "QR Codes",
    href: "/dashboard/qr",
    icon: QrCode,
  },
  {
    title: "Wallet",
    href: "/dashboard/wallet",
    icon: Wallet,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-950 text-white h-screen border-r border-zinc-800 p-6">
      <h1 className="text-2xl font-bold text-green-500 mb-10">
        SmartShopper
      </h1>

      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-zinc-800 transition"
            >
              <Icon size={20} />

              <span>{link.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
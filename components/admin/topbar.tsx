import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">
      <div>
        <h2 className="text-2xl font-bold">
          SmartShopper Admin
        </h2>

        <p className="text-sm text-gray-500">
          Manage your loyalty platform.
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="flex items-center rounded-xl border px-4 py-2">
          <Search size={18} className="mr-2 text-gray-400" />

          <input
            placeholder="Search..."
            className="outline-none"
          />
        </div>

        <button className="rounded-xl border p-3">
          <Bell size={20} />
        </button>

      </div>
    </header>
  );
}
"use client";

import { Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between border-b bg-white px-8 py-4">

      <div>
        <h2 className="text-2xl font-bold text-zinc-900">
          Dashboard
        </h2>

        <p className="text-gray-500">
          Welcome back 👋
        </p>
      </div>

      <div className="flex items-center gap-6">

        <Bell
          size={22}
          className="cursor-pointer text-zinc-700"
        />

        <Avatar>
          <AvatarFallback>SS</AvatarFallback>
        </Avatar>

      </div>
    </header>
  );
}
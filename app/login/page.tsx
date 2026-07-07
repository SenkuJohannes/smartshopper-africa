"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function login() {
    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-8">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold">
            SmartShopper
          </h1>

          <p className="mt-3 text-gray-500">
            Sign in to your business dashboard.
          </p>
        </div>

        <div className="space-y-5">

          <div>
            <label className="mb-2 block font-medium">
              Email
            </label>

            <input
              type="email"
              className="w-full rounded-xl border p-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Password
            </label>

            <input
              type="password"
              className="w-full rounded-xl border p-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={login}
            disabled={loading}
            className="w-full rounded-xl bg-green-600 py-3 text-white transition hover:bg-green-700 disabled:bg-gray-400"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </div>

        <div className="mt-8 text-center text-sm">
          <a
            href="/forgot-password"
            className="text-green-600 hover:underline"
          >
            Forgot your password?
          </a>
        </div>

      </div>
    </main>
  );
}
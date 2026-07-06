"use client";

import { useEffect, useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import ScannerHeader from "@/components/scanner/ScannerHeader";
import ScannerStats from "@/components/scanner/ScannerStats";

export default function ScannerPage() {
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [stats, setStats] = useState({
    scansToday: 0,
    pointsToday: 0,
    redeemedToday: 0,
  });

  async function loadStats() {
    try {
      const response = await fetch("/api/scanner-stats");

      let result = await response.json();

      // Handle APIs that accidentally return JSON as a string
      if (typeof result === "string") {
        result = JSON.parse(result);
      }

      console.log("Scanner Stats:", result);

      if (response.ok) {
        setStats({
          scansToday: result.scansToday ?? 0,
          pointsToday: result.pointsToday ?? 0,
          redeemedToday: result.redeemedToday ?? 0,
        });
      }
    } catch (error) {
      console.error("Unable to load stats", error);
    }
  }

  useEffect(() => {
    loadStats();
  }, []);

  async function awardPoints(cardNumber: string) {
    setLoading(true);

    console.log("Sending card number:", cardNumber);

    try {
      const response = await fetch("/api/award-points", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cardNumber,
        }),
      });

      const result = await response.json();

      console.log("API Response:", result);

      setLoading(false);

      if (!response.ok) {
        setMessage(result.error || "Something went wrong.");
        setScanned(false);
        return;
      }

      // Refresh statistics immediately
      await loadStats();

      setMessage(`
✅ ${result.pointsAwarded} points awarded!

Member:
${result.customerName}

Current Balance:
${result.currentPoints} Points
      `);
    } catch (err) {
      console.error(err);

      setLoading(false);
      setMessage("Unable to contact server.");
      setScanned(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-8">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-xl">

        <h1 className="mb-2 text-3xl font-bold">
          Staff QR Scanner
        </h1>

        <p className="mb-8 text-gray-500">
          Scan a customer's loyalty card.
        </p>

        {/* Stats */}

        <div className="mb-8 grid grid-cols-3 gap-4">

          <div className="rounded-xl bg-slate-50 p-4 text-center">
            <p className="text-sm text-gray-500">
              Today's Scans
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {stats.scansToday}
            </h2>
          </div>

          <div className="rounded-xl bg-slate-50 p-4 text-center">
            <p className="text-sm text-gray-500">
              Points Awarded
            </p>

            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {stats.pointsToday}
            </h2>
          </div>

          <div className="rounded-xl bg-slate-50 p-4 text-center">
            <p className="text-sm text-gray-500">
              Rewards Redeemed
            </p>

            <h2 className="mt-2 text-3xl font-bold text-orange-500">
              {stats.redeemedToday}
            </h2>
          </div>

        </div>

        {!scanned && (
          <Scanner
            constraints={{
              facingMode: "environment",
            }}
            onScan={(results) => {
              if (!results.length || scanned) return;

              setScanned(true);

              let value = results[0].rawValue.trim();

              console.log("==============================");
              console.log("RAW QR VALUE:");
              console.log(value);

              if (value.includes("/card/")) {
                value = value.split("/card/")[1];
              }

              if (value.includes("/member/")) {
                value = value.split("/member/")[1];
              }

              console.log("==============================");
              console.log("Extracted Card Number:");
              console.log(value);
              console.log("==============================");

              awardPoints(value);
            }}
            onError={(error) => {
              console.error(error);
              setScanned(false);
            }}
          />
        )}

        {loading && (
          <div className="mt-8 text-center">
            <p className="text-lg font-semibold">
              Awarding points...
            </p>
          </div>
        )}

        {message && (
          <div className="mt-8 whitespace-pre-line rounded-xl border border-green-300 bg-green-100 p-6">
            {message}
          </div>
        )}

        {scanned && !loading && (
          <button
            onClick={() => {
              setScanned(false);
              setMessage("");
            }}
            className="mt-6 w-full rounded-xl bg-green-600 py-3 text-white transition hover:bg-green-700"
          >
            📷 Scan Next Customer
          </button>
        )}

      </div>
    </main>
  );
}
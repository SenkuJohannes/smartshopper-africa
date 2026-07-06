"use client";

import { useEffect, useState } from "react";

import ScannerHeader from "@/components/scanner/ScannerHeader";
import ScannerStats from "@/components/scanner/ScannerStats";
import ScannerCamera from "@/components/scanner/ScannerCamera";
import DiscountCalculator from "@/components/scanner/DiscountCalculator";
import RedeemModal from "@/components/scanner/RedeemModal";

export default function ScannerDevicePage() {
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState<any>(null);

  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [redeeming, setRedeeming] = useState(false);

  const [stats, setStats] = useState({
    scansToday: 0,
    pointsToday: 0,
    redeemedToday: 0,
  });

  async function loadStats() {
    try {
      const response = await fetch("/api/scanner-stats");

      if (!response.ok) return;

      const result = await response.json();

      setStats(result);
    } catch (error) {
      console.error("Unable to load scanner stats", error);
    }
  }

  useEffect(() => {
    loadStats();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        loadStats();
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, []);

  async function awardPoints(cardNumber: string) {
    try {
      setLoading(true);

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

      console.log("API Response");
      console.log(result);

      if (!response.ok) {
        setLoading(false);
        setCustomer(null);
        setScanned(false);

        alert(result.error ?? "Unknown error");

        return;
      }

      setCustomer(result);

      setLoading(false);

      await loadStats();

    } catch (error) {
      console.error(error);

      setLoading(false);
      setCustomer(null);
      setScanned(false);

      alert("Unexpected error occurred.");
    }
  }

  // --------------------------------------------------
  // Temporary Redeem Function
  // (We'll connect the real API next)
  // --------------------------------------------------

  async function redeemDiscount() {
    try {
      setRedeeming(true);

      // Simulate API call
      await new Promise((resolve) =>
        setTimeout(resolve, 1500)
      );

      alert("Reward redeemed successfully!");

      setRedeeming(false);
      setShowRedeemModal(false);

      // Reset scanner
      setCustomer(null);
      setScanned(false);

      await loadStats();

    } catch (error) {
      console.error(error);

      setRedeeming(false);

      alert("Unable to redeem reward.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-5xl">

        <ScannerHeader />

        <ScannerStats
          scansToday={stats.scansToday}
          pointsToday={stats.pointsToday}
          redeemedToday={stats.redeemedToday}
        />

        <div className="rounded-3xl bg-white p-8 shadow-xl">

          {/* Camera */}

          {!customer && !loading && (
            <ScannerCamera
              scanned={scanned}
              onScan={(cardNumber) => {
                setCustomer(null);
                setScanned(true);

                awardPoints(cardNumber);
              }}
              onError={() => {
                setScanned(false);
              }}
            />
          )}

          {/* Loading */}

          {loading && (
            <div className="py-20 text-center">

              <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>

              <h2 className="mt-6 text-2xl font-bold">
                Awarding Points...
              </h2>

            </div>
          )}

          {/* Checkout */}

          {customer && (
            <DiscountCalculator
              customer={customer}
              onRedeem={() => setShowRedeemModal(true)}
              onNextScan={() => {
                setCustomer(null);
                setScanned(false);
              }}
            />
          )}

        </div>

      </div>

      {/* Redeem Modal */}

      <RedeemModal
        open={showRedeemModal}
        customer={customer}
        loading={redeeming}
        onCancel={() => setShowRedeemModal(false)}
        onConfirm={redeemDiscount}
      />

    </main>
  );
}
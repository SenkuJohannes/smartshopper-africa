"use client";

import { Scanner } from "@yudiel/react-qr-scanner";
import { Camera, ScanLine } from "lucide-react";

interface ScannerCameraProps {
  scanned: boolean;
  onScan: (cardNumber: string) => void;
  onError: () => void;
}

export default function ScannerCamera({
  scanned,
  onScan,
  onError,
}: ScannerCameraProps) {
  return (
    <>
      <div className="mb-6 flex items-center gap-3">
        <Camera className="text-green-600" />

        <h2 className="text-2xl font-bold">
          Ready to Scan
        </h2>
      </div>

      {!scanned && (
        <>
          <div className="overflow-hidden rounded-2xl border-4 border-dashed border-green-300">

            <Scanner
              constraints={{
                facingMode: "environment",
              }}
              onScan={(results) => {
                if (!results.length) return;

                const rawValue = results[0].rawValue?.trim();

                if (!rawValue) return;

                let cardNumber = rawValue;

                if (rawValue.includes("/card/")) {
                  cardNumber =
                    rawValue.split("/card/").pop() ?? rawValue;
                }

                onScan(cardNumber);
              }}
              onError={() => {
                onError();
              }}
            />

          </div>

          <div className="mt-6 flex items-center justify-center gap-3 rounded-xl bg-green-50 p-4">
            <ScanLine className="text-green-600" />

            <p className="font-medium text-green-700">
              Hold the customer's QR code inside the frame
            </p>
          </div>
        </>
      )}
    </>
  );
}
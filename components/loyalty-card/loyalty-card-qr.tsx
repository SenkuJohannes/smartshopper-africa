"use client";

import QRCode from "react-qr-code";

type Props = {
  cardNumber: string;
  memberNumber?: string;
};

export default function LoyaltyCardQr({
  cardNumber,
  memberNumber,
}: Props) {
  // Development URL
  const qrValue = `http://localhost:3000/card/${cardNumber}`;

  // Production:
  // const qrValue = `https://smartshopper.africa/card/${cardNumber}`;

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-5">

        <h2 className="text-xl font-bold">
          Membership QR
        </h2>

        <p className="text-green-100 text-sm mt-1">
          Present this QR code when making a purchase.
        </p>

      </div>

      {/* QR */}
      <div className="p-8 flex justify-center">

        <div className="bg-white border-4 border-green-100 rounded-3xl p-5 shadow-lg">

          <QRCode
            value={qrValue}
            size={220}
            bgColor="#FFFFFF"
            fgColor="#000000"
            level="H"
          />

        </div>

      </div>

      {/* Card Details */}
      <div className="px-8 pb-8">

        <div className="grid grid-cols-2 gap-4">

          <div className="rounded-2xl bg-slate-50 p-4">

            <p className="text-xs uppercase tracking-wider text-gray-500">
              Member Number
            </p>

            <p className="mt-2 text-lg font-bold break-all">
              {memberNumber}
            </p>

          </div>

          <div className="rounded-2xl bg-slate-50 p-4">

            <p className="text-xs uppercase tracking-wider text-gray-500">
              Card Number
            </p>

            <p className="mt-2 text-lg font-bold break-all">
              {cardNumber}
            </p>

          </div>

        </div>

        {/* Status */}
        <div className="mt-6 rounded-2xl bg-green-50 border border-green-200 p-4 flex items-center justify-between">

          <div>

            <p className="text-sm font-semibold text-green-800">
              Membership Status
            </p>

            <p className="text-sm text-green-700">
              Active & Ready to Scan
            </p>

          </div>

          <div className="h-4 w-4 rounded-full bg-green-500 animate-pulse" />

        </div>

      </div>

    </div>
  );
}
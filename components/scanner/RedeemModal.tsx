"use client";

import { X, Gift, Wallet } from "lucide-react";

interface Props {
  open: boolean;
  customer: any;
  loading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function RedeemModal({
  open,
  customer,
  loading,
  onCancel,
  onConfirm,
}: Props) {
  if (!open || !customer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">

      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl">

        <div className="border-b p-6">

          <div className="flex items-center justify-between">

            <h2 className="text-3xl font-bold">
              Redeem Reward
            </h2>

            <button onClick={onCancel}>
              <X size={26} />
            </button>

          </div>

        </div>

        <div className="space-y-6 p-8">

          <div className="rounded-2xl bg-green-50 p-5">

            <p className="text-sm text-gray-500">
              Customer
            </p>

            <h3 className="text-2xl font-bold">
              {customer.customerName}
            </h3>

          </div>

          <div className="rounded-2xl bg-blue-50 p-5">

            <Gift className="mb-2 text-blue-600" />

            <p className="text-sm text-gray-500">
              Reward
            </p>

            <h3 className="text-xl font-bold">
              {customer.availableDiscount}% OFF
            </h3>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="rounded-2xl bg-slate-100 p-5">

              <Wallet className="mb-2 text-green-600" />

              <p className="text-sm text-gray-500">
                Current Balance
              </p>

              <h2 className="text-3xl font-black">
                {customer.currentPoints}
              </h2>

            </div>

            <div className="rounded-2xl bg-slate-100 p-5">

              <Wallet className="mb-2 text-red-500" />

              <p className="text-sm text-gray-500">
                Balance After
              </p>

              <h2 className="text-3xl font-black">
                {customer.remainingPoints}
              </h2>

            </div>

          </div>

        </div>

        <div className="grid grid-cols-2 gap-4 border-t p-6">

          <button
            onClick={onCancel}
            className="rounded-2xl border py-4 font-bold"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-2xl bg-green-600 py-4 font-bold text-white hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Redeeming..." : "Confirm Redeem"}
          </button>

        </div>

      </div>

    </div>
  );
}
"use client";

import {
  Percent,
  Gift,
  Wallet,
  Sparkles,
  User,
  CreditCard,
  Star,
  ShoppingBag,
} from "lucide-react";

interface Props {
  customer: any;
  onRedeem: () => void;
  onNextScan: () => void;
}

export default function DiscountCalculator({
  customer,
  onRedeem,
  onNextScan,
}: Props) {

  const progress =
    customer.availableDiscount >= 100
      ? 100
      : ((100 - customer.pointsUntilNext) / 100) * 100;

  return (
    <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-2xl">

      {/* ================================================= */}
      {/* CUSTOMER SUMMARY */}
      {/* ================================================= */}

      <div className="border-b bg-gradient-to-r from-green-50 to-emerald-50 p-8">

        <div className="flex items-center justify-between">

          <div>

            <div className="flex items-center gap-3">

              <div className="rounded-full bg-green-600 p-3 text-white">
                <User size={22} />
              </div>

              <div>

                <p className="text-sm uppercase tracking-widest text-green-700">
                  Customer Found
                </p>

                <h2 className="text-3xl font-bold">
                  {customer.customerName}
                </h2>

              </div>

            </div>

          </div>

          <div className="rounded-2xl bg-green-600 px-6 py-3 text-center text-white">

            <p className="text-xs uppercase">
              Points Added
            </p>

            <h2 className="text-3xl font-black">
              +{customer.pointsAwarded}
            </h2>

          </div>

        </div>

        <div className="mt-8 grid grid-cols-3 gap-5">

          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <CreditCard
              className="mb-3 text-green-600"
              size={24}
            />

            <p className="text-xs uppercase text-gray-500">
              Card Number
            </p>

            <h3 className="mt-2 font-bold">
              {customer.cardNumber}
            </h3>

          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <Star
              className="mb-3 text-yellow-500"
              size={24}
            />

            <p className="text-xs uppercase text-gray-500">
              Lifetime Points
            </p>

            <h3 className="mt-2 text-2xl font-black">
              {customer.lifetimePoints}
            </h3>

          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <ShoppingBag
              className="mb-3 text-blue-600"
              size={24}
            />

            <p className="text-xs uppercase text-gray-500">
              Visits
            </p>

            <h3 className="mt-2 text-2xl font-black">
              {customer.visits}
            </h3>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* DISCOUNT HERO */}
      {/* ================================================= */}


      {/* ================================================= */}
      {/* CONTENT */}
      {/* ================================================= */}

      <div className="space-y-8 p-8">

        <div className="rounded-3xl border border-green-100 bg-green-50 p-6">

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-green-600 p-4 text-white">
              <Gift size={28} />
            </div>

            <div>

              <p className="text-sm uppercase tracking-wide text-gray-500">
                Selected Reward
              </p>

              <h2 className="text-3xl font-bold">
                {customer.rewardProduct || "Selected Product"}
              </h2>

            </div>

          </div>

        </div>

        <div className="grid grid-cols-3 gap-5">

          <div className="rounded-3xl bg-slate-100 p-6 text-center">

            <Wallet
              className="mx-auto mb-3 text-green-600"
              size={28}
            />

            <p className="text-xs uppercase text-gray-500">
              Customer Balance
            </p>

            <h2 className="mt-2 text-4xl font-black">
              {customer.currentPoints}
            </h2>

            <p className="text-sm text-gray-500">
              points
            </p>

          </div>

          <div className="rounded-3xl bg-slate-100 p-6 text-center">

            <Percent
              className="mx-auto mb-3 text-orange-500"
              size={28}
            />

            <p className="text-xs uppercase text-gray-500">
              Discount Cost
            </p>

            <h2 className="mt-2 text-4xl font-black">
              {customer.pointsRequired}
            </h2>

            <p className="text-sm text-gray-500">
              points
            </p>

          </div>

          <div className="rounded-3xl bg-slate-100 p-6 text-center">

            <Sparkles
              className="mx-auto mb-3 text-blue-600"
              size={28}
            />

            <p className="text-xs uppercase text-gray-500">
              Balance After
            </p>

            <h2 className="mt-2 text-4xl font-black">
              {customer.remainingPoints}
            </h2>

            <p className="text-sm text-gray-500">
              points
            </p>

          </div>

        </div>

       
       {/* Next Discount*/}

                {/* ================================================= */}
        {/* Next Discount */}
        {/* ================================================= */}

        {customer.availableDiscount < 100 && (

          <div className="rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-50 to-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">

                  Next Discount

                </p>

                <h2 className="mt-2 text-5xl font-black text-blue-700">

                  {customer.nextDiscount}%

                </h2>

              </div>

              <div className="text-right">

                <p className="text-3xl font-bold">

                  {customer.pointsUntilNext}

                </p>

                <p className="text-gray-500">

                  points remaining

                </p>

              </div>

            </div>

            <div className="mt-6">

              <div className="mb-2 flex justify-between text-sm text-gray-600">

                <span>Progress</span>

                <span>{Math.round(progress)}%</span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-white shadow-inner">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                  }}
                />

              </div>

            </div>

          </div>

        )}

        {/* ================================================= */}
        {/* Actions */}
      

        <div className="grid grid-cols-2 gap-5">

  <button
  onClick={onRedeem}
  className="rounded-2xl bg-green-600 py-5 text-xl font-bold text-white shadow-xl transition hover:bg-green-700 hover:scale-[1.02] hover:shadow-2xl"
>
  Redeem Discount
</button>

  <button
    onClick={onNextScan}
    className="rounded-2xl border-2 border-slate-200 bg-white py-5 text-xl font-bold text-slate-700 transition hover:bg-slate-50"
  >
    Save Points
  </button>

</div>

        {/* ================================================= */}
        {/* Divider */}
        {/* ================================================= */}

        <div className="flex items-center gap-4">

          <div className="h-px flex-1 bg-slate-200" />

          <span className="text-sm uppercase tracking-widest text-slate-400">
            Ready to scan the next QR code
          </span>

          <div className="h-px flex-1 bg-slate-200" />

        </div>

        {/* ================================================= */}
        {/* Next Customer */}
        {/* ================================================= */}

        <button
          onClick={onNextScan}
          className="w-full rounded-3xl bg-slate-900 py-6 text-xl font-bold text-white transition hover:bg-black"
        >
          📷 Scan Next Customer
        </button>

      </div>

    </div>
  );
}
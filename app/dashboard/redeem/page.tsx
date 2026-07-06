"use client";

import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Reward = {
  id: string;
  title: string;
  description: string;
  points_required: number;
};

export default function RedeemPage() {
  const [loading, setLoading] = useState(false);
  const [memberLoaded, setMemberLoaded] = useState(false);

  const [memberNumber, setMemberNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [currentPoints, setCurrentPoints] = useState(0);
  const [rewards, setRewards] = useState<Reward[]>([]);

  const [selectedReward, setSelectedReward] =
    useState<Reward | null>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);

  const [successOpen, setSuccessOpen] = useState(false);
  const [successTitle, setSuccessTitle] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleScan(rawValue: string) {
    if (loading) return;

    setLoading(true);

    let member = rawValue;

    if (rawValue.includes("/member/")) {
      member = rawValue.split("/member/")[1];
    }

    try {
      const response = await fetch(
        "/api/redeem/find-member",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            memberNumber: member,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setSuccessTitle("Member Not Found");
        setSuccessMessage(result.error);
        setSuccessOpen(true);

        setLoading(false);
        return;
      }

      setMemberNumber(member);
      setCustomerName(result.customerName);
      setCurrentPoints(result.currentPoints);
      setRewards(result.rewards);
      setMemberLoaded(true);
    } catch (err) {
      console.error(err);

      setSuccessTitle("Server Error");
      setSuccessMessage(
        "Unable to load member."
      );
      setSuccessOpen(true);
    }

    setLoading(false);
  }

  async function redeemReward(rewardId: string) {
    setLoading(true);

    try {
      const response = await fetch(
        "/api/redeem/reward",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            memberNumber,
            rewardId,
          }),
        }
      );

      const result = await response.json();

      setLoading(false);

      if (!response.ok) {
        setSuccessTitle("Unable To Redeem");
        setSuccessMessage(result.error);
        setSuccessOpen(true);

        return;
      }

      setCurrentPoints(result.currentPoints);

      setSuccessTitle("🎉 Reward Redeemed");

      setSuccessMessage(
        `${selectedReward?.title}

Customer:
${customerName}

Remaining Balance:
${result.currentPoints} Points`
      );

      setSuccessOpen(true);
    } catch (err) {
      console.error(err);

      setLoading(false);

      setSuccessTitle("Server Error");

      setSuccessMessage(
        "Unable to redeem reward."
      );

      setSuccessOpen(true);
    }
  }

  return (
    <>
     
  <main className="min-h-screen bg-slate-100 flex items-center justify-center p-8">
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">

      <h1 className="text-4xl font-bold mb-2">
        Redeem Rewards
      </h1>

      <p className="text-gray-500 mb-8">
        Scan a customer's QR code.
      </p>

      {!memberLoaded && !loading && (
        <Scanner
          constraints={{
            facingMode: "environment",
          }}
          onScan={(results) => {
            if (!results.length) return;

            handleScan(results[0].rawValue);
          }}
        />
      )}

      {loading && (
        <div className="text-center py-10">
          <div className="text-3xl animate-pulse">☕</div>

          <p className="font-bold text-xl mt-4">
            Processing...
          </p>
        </div>
      )}

      {memberLoaded && !loading && (
        <>
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl p-8 mb-8 shadow-lg">

            <h2 className="text-3xl font-bold">
              {customerName}
            </h2>

            <p className="mt-2 opacity-90">
              Member #{memberNumber}
            </p>

            <div className="mt-8 text-6xl font-black">
              {currentPoints}
            </div>

            <div className="uppercase tracking-widest text-sm mt-2 opacity-80">
              Current Points
            </div>

          </div>

          <h3 className="text-2xl font-bold mb-6">
            Available Rewards
          </h3>

          <div className="space-y-5">

            {rewards.map((reward) => {

              const canRedeem =
                currentPoints >= reward.points_required;

              return (

                <div
                  key={reward.id}
                  className="rounded-2xl border bg-white shadow-sm p-6 flex justify-between items-center"
                >

                  <div>

                    <h4 className="text-xl font-bold">
                      {reward.title}
                    </h4>

                    <p className="text-gray-500 mt-2">
                      {reward.description}
                    </p>

                  </div>

                  <div className="text-right">

                    <div className="text-2xl font-bold">
                      {reward.points_required}
                    </div>

                    <div className="text-sm text-gray-500">
                      Points
                    </div>

                    <Button
                      className="mt-4"
                      disabled={!canRedeem}
                      onClick={() => {
                        setSelectedReward(reward);
                        setConfirmOpen(true);
                      }}
                    >
                      Redeem
                    </Button>

                  </div>

                </div>

              );

            })}

          </div>

          <Button
            variant="secondary"
            className="w-full mt-8"
            onClick={() => {
              setMemberLoaded(false);
              setCustomerName("");
              setCurrentPoints(0);
              setRewards([]);
              setMemberNumber("");
            }}
          >
            Scan Another Customer
          </Button>

        </>
      )}

    </div>
  </main>

  {/* Confirmation Dialog */}

  <Dialog
    open={confirmOpen}
    onOpenChange={setConfirmOpen}
  >
    <DialogContent>

      <DialogHeader>

        <DialogTitle>
          Confirm Redemption
        </DialogTitle>

        <DialogDescription>
          Please review this redemption.
        </DialogDescription>

      </DialogHeader>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span>Customer</span>
          <strong>{customerName}</strong>
        </div>

        <div className="flex justify-between">
          <span>Reward</span>
          <strong>{selectedReward?.title}</strong>
        </div>

        <div className="flex justify-between">
          <span>Current Balance</span>
          <strong>{currentPoints} Points</strong>
        </div>

        <div className="flex justify-between">
          <span>Cost</span>

          <strong className="text-red-600">
            {selectedReward?.points_required} Points
          </strong>

        </div>

        <hr />

        <div className="flex justify-between text-lg">

          <span>Remaining</span>

          <strong className="text-green-600">
            {currentPoints -
              (selectedReward?.points_required ?? 0)} Points
          </strong>

        </div>

      </div>

      <DialogFooter>

        <Button
          variant="secondary"
          onClick={() => setConfirmOpen(false)}
        >
          Cancel
        </Button>

        <Button
          onClick={() => {
            if (!selectedReward) return;

            setConfirmOpen(false);

            redeemReward(selectedReward.id);
          }}
        >
          Redeem Reward
        </Button>

      </DialogFooter>

    </DialogContent>
  </Dialog>

  {/* Success Dialog */}

  <Dialog
    open={successOpen}
    onOpenChange={setSuccessOpen}
  >
    <DialogContent>

      <DialogHeader>

        <DialogTitle className="text-center text-3xl">
          {successTitle}
        </DialogTitle>

      </DialogHeader>

      <div className="text-center whitespace-pre-line text-lg py-4">

        {successMessage}

      </div>

      <DialogFooter>

        <Button
          className="w-full"
          onClick={() => setSuccessOpen(false)}
        >
          Done
        </Button>

      </DialogFooter>

    </DialogContent>
  </Dialog>


</>
);

}

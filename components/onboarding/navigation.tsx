"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Props {
  back?: string;
  next?: string;
  nextLabel?: string;
  onNext?: () => void;
  nextDisabled?: boolean;
}

export default function Navigation({
  back,
  next,
  nextLabel = "Continue",
  onNext,
  nextDisabled = false,
}: Props) {
  const router = useRouter();

  return (
    <div className="mt-10 flex items-center justify-between">
      <div>
        {back ? (
          <Button
            variant="secondary"
            onClick={() => router.push(back)}
          >
            ← Back
          </Button>
        ) : (
          <div />
        )}
      </div>

      <Button
        disabled={nextDisabled}
        onClick={() => {
          if (onNext) {
            onNext();
          } else if (next) {
            router.push(next);
          }
        }}
      >
        {nextLabel}
      </Button>
    </div>
  );
}
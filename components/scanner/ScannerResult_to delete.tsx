import { CheckCircle2 } from "lucide-react";

interface ScannerResultProps {
  message: string;
  onNextScan: () => void;
}

export default function ScannerResult({
  message,
  onNextScan,
}: ScannerResultProps) {
  if (!message) return null;

  return (
    <div className="mt-8 rounded-2xl border border-green-300 bg-green-50 p-8">
      <div className="flex items-center gap-3">
        <CheckCircle2
          size={32}
          className="text-green-600"
        />

        <h2 className="text-2xl font-bold text-green-700">
          Scanner Result
        </h2>
      </div>

      <div className="mt-6 whitespace-pre-line text-lg">
        {message}
      </div>

      <button
        onClick={onNextScan}
        className="mt-8 w-full rounded-xl bg-green-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-green-700"
      >
        📷 Scan Next QR Code
      </button>
    </div>
  );
}
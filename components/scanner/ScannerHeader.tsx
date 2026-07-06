import { Wifi, BatteryFull } from "lucide-react";

export default function ScannerHeader() {
  return (
    <div className="mb-8 rounded-3xl bg-white p-8 shadow">
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold">
            SmartShopper Scanner
          </h1>

          <p className="mt-2 text-gray-500">
            Front Counter
          </p>
        </div>

        <div className="space-y-2 text-right">

          <div className="flex items-center justify-end gap-2 font-semibold text-green-600">
            <Wifi size={18} />
            Online
            
          </div>
          

          <div className="flex items-center justify-end gap-2">
            <BatteryFull size={18} />
            98%
          </div>

          <p className="text-sm text-gray-400">
            Last Sync: Just now
          </p>

        </div>

      </div>
    </div>
  );
}
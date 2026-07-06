type Props = {
  program: any;
};

export default function LoyaltyCardFooter({
  program,
}: Props) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 space-y-4">

      {program?.website && (
        <p>
          🌍 {program.website}
        </p>
      )}

      {program?.business_phone && (
        <p>
          ☎️ {program.business_phone}
        </p>
      )}

      {program?.business_address && (
        <p>
          📍 {program.business_address}
        </p>
      )}

    </div>
  );
}
import LoyaltyCardHeader from "./loyalty-card-header";
import LoyaltyCardPoints from "./loyalty-card-points";
import LoyaltyCardQr from "./loyalty-card-qr";
import LoyaltyCardRewards from "./loyalty-card-rewards";

type Transaction = {
  id: string;
  description: string;
  points: number;
  transaction_type: string;
  created_at: string;
};

type Props = {
  program: any;
  membership: any;
  customer: any;
  activities: Transaction[];
};

export default function LoyaltyCard({
  program,
  membership,
  customer,
}: Props) {
  return (
    <div className="mx-auto w-full max-w-md space-y-6">

      <LoyaltyCardHeader
        program={program}
        customer={customer}
        membership={membership}
      />

      <LoyaltyCardPoints
        points={membership.current_points}
      />

      <LoyaltyCardQr
        cardNumber={membership.card_number}
        memberNumber={membership.member_number}
      />

      <LoyaltyCardRewards
        points={membership.current_points}
      />

    </div>
  );
}
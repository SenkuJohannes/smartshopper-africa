export interface WalletPassModel {
  membershipId: string;

  business: {
    id: string;
    name: string;
    logo?: string | null;
    primaryColor?: string | null;
    secondaryColor?: string | null;
  };

  customer: {
    firstName: string;
    lastName: string;
  };

  loyalty: {
    memberNumber: string;
    points: number;
    visits: number;
    tier?: string | null;
  };

  rewards: {
    nextReward?: string;
    remainingPoints?: number;
  };

  qrCode: string;
}
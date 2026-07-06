import { WalletRepository } from "./repository";
import { syncMembership } from "./service";

export interface WalletManagerResult {
  success: boolean;
  created: boolean;
  synced: boolean;
  message?: string;
}

export class WalletManager {
  /**
   * Create a wallet pass only when requested.
   */
  static async createWallet(
    membershipId: string,
    provider: "apple" | "google"
  ): Promise<WalletManagerResult> {
    const existing = await WalletRepository.findPassByMembership(
      membershipId,
      provider
    );

    if (existing) {
      return {
        success: true,
        created: false,
        synced: false,
        message: `${provider} wallet already exists`,
      };
    }

    const serialNumber = crypto.randomUUID();

    const pass = await WalletRepository.createPass({
      membership_id: membershipId,
      provider,
      serial_number: serialNumber,
      passkit_pass_id:
        provider === "apple" ? serialNumber : null,
      external_object_id:
        provider === "google" ? serialNumber : null,
      status: "active",
    });

    if (!pass) {
      return {
        success: false,
        created: false,
        synced: false,
        message: "Unable to create wallet pass",
      };
    }

    const sync = await syncMembership(membershipId);

    return {
      success: sync.success,
      created: true,
      synced: sync.success,
    };
  }

  /**
   * Called after points change.
   */
  static async pointsUpdated(
    membershipId: string
  ): Promise<WalletManagerResult> {
    const sync = await syncMembership(membershipId);

    return {
      success: sync.success,
      created: false,
      synced: sync.success,
      message: sync.message,
    };
  }

  /**
   * Called after reward redemption.
   */
  static async rewardRedeemed(
    membershipId: string
  ): Promise<WalletManagerResult> {
    return this.pointsUpdated(membershipId);
  }

  /**
   * Called after profile changes.
   */
  static async profileUpdated(
    membershipId: string
  ): Promise<WalletManagerResult> {
    return this.pointsUpdated(membershipId);
  }
}
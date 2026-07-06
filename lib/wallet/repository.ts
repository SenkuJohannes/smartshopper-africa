import { supabase } from "@/lib/supabase/client";

export interface WalletPass {
  id: string;
  membership_id: string;
  provider: string;
  passkit_pass_id: string | null;
  serial_number: string;
  external_object_id: string | null;
  status: string;
  last_synced_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface WalletDevice {
  id: string;
  device_library_identifier: string;
  push_token: string;
  serial_number: string;
  authentication_token: string;
  created_at: string;
}

export class WalletRepository {
  /**
   * Find a wallet pass by membership + provider
   */
  static async findPassByMembership(
    membershipId: string,
    provider: string
  ): Promise<WalletPass | null> {
    const { data, error } = await supabase
      .from("wallet_passes")
      .select("*")
      .eq("membership_id", membershipId)
      .eq("provider", provider)
      .maybeSingle();

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  }

  /**
   * Find by serial number
   */
  static async findPassBySerial(
    serialNumber: string
  ): Promise<WalletPass | null> {
    const { data, error } = await supabase
      .from("wallet_passes")
      .select("*")
      .eq("serial_number", serialNumber)
      .maybeSingle();

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  }

  /**
   * Create a wallet pass
   */
  static async createPass(
    pass: Partial<WalletPass>
  ): Promise<WalletPass | null> {
    const { data, error } = await supabase
      .from("wallet_passes")
      .insert(pass)
      .select()
      .single();

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  }

  /**
   * Update an existing pass
   */
  static async updatePass(
    id: string,
    updates: Partial<WalletPass>
  ): Promise<boolean> {
    const { error } = await supabase
      .from("wallet_passes")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      return false;
    }

    return true;
  }

  /**
   * Mark last sync
   */
  static async markSynced(id: string): Promise<boolean> {
    return this.updatePass(id, {
      last_synced_at: new Date().toISOString(),
    });
  }

  /**
   * Register an Apple Wallet device
   */
  static async registerDevice(device: Partial<WalletDevice>) {
    const { data, error } = await supabase
      .from("wallet_devices")
      .upsert(device, {
        onConflict: "device_library_identifier,serial_number",
      })
      .select()
      .single();

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  }

  /**
   * Remove a registered device
   */
  static async unregisterDevice(
    deviceLibraryIdentifier: string,
    serialNumber: string
  ): Promise<boolean> {
    const { error } = await supabase
      .from("wallet_devices")
      .delete()
      .eq("device_library_identifier", deviceLibraryIdentifier)
      .eq("serial_number", serialNumber);

    if (error) {
      console.error(error);
      return false;
    }

    return true;
  }

  /**
   * List every device registered for a pass
   */
  static async listDevices(
    serialNumber: string
  ): Promise<WalletDevice[]> {
    const { data, error } = await supabase
      .from("wallet_devices")
      .select("*")
      .eq("serial_number", serialNumber);

    if (error) {
      console.error(error);
      return [];
    }

    return data ?? [];
  }
}
export interface WalletProvider {
  name: string;

  updatePass(membership: any): Promise<boolean>;

  createPass?(membership: any): Promise<boolean>;
}

const providers: WalletProvider[] = [];

export function registerProvider(provider: WalletProvider) {
  providers.push(provider);
}

export function getProviders() {
  return providers;
}
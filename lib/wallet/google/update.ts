export async function updatePass(
  membership: any
): Promise<boolean> {
  console.log(
    "Updating Google Wallet pass for",
    membership.customer.first_name
  );

  // Google Wallet update comes later

  return true;
}
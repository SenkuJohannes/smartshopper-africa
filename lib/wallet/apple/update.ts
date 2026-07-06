export async function updatePass(
  membership: any
): Promise<boolean> {
  console.log(
    "Updating Apple Wallet pass for",
    membership.customer.first_name
  );

  // PassKit update comes later

  return true;
}
const CHARACTERS =
  "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function random(length: number) {
  let result = "";

  for (let i = 0; i < length; i++) {
    result +=
      CHARACTERS[
        Math.floor(Math.random() * CHARACTERS.length)
      ];
  }

  return result;
}

export function generateJoinCode(
  businessName: string
): string {
  const prefix = businessName
    .replace(/[^A-Za-z]/g, "")
    .toUpperCase()
    .slice(0, 3);

  return `${prefix}-${random(6)}`;
}
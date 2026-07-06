export function generateMemberNumber() {
  const random = Math.floor(100000 + Math.random() * 900000);

  return `SS-${random}`;
}
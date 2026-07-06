import { generateSlug } from "./generate-slug";
import { generateJoinCode } from "./generate-join-code";

export function generateBusinessIdentity(
  businessName: string
) {
  return {
    slug: generateSlug(businessName),
    joinCode: generateJoinCode(businessName),
  };
}
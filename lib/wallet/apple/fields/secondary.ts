import { WalletPassModel } from "../../builder";

export function buildSecondaryFields(
  model: WalletPassModel
) {
  return [
    {
      key: "member",

      label: "MEMBER",

      value: model.loyalty.memberNumber,
    },
  ];
}
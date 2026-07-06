import { WalletPassModel } from "../../builder";

export function buildPrimaryFields(
  model: WalletPassModel
) {
  return [
    {
      key: "points",

      label: "POINTS",

      value: model.loyalty.points,
    },
  ];
}
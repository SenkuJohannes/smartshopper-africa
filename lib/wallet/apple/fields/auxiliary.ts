import { WalletPassModel } from "../../builder";

export function buildAuxiliaryFields(
  model: WalletPassModel
) {
  return [
    {
      key: "visits",

      label: "VISITS",

      value: model.loyalty.visits,
    },
  ];
}
import { WalletPassModel } from "../../builder";

export function buildBackFields(
  model: WalletPassModel
) {
  return [
    {
      key: "business",

      label: "Business",

      value: model.business.name,
    },

    {
      key: "member",

      label: "Customer",

      value:
        `${model.customer.firstName} ${model.customer.lastName}`,
    },

    {
      key: "reward",

      label: "Next Reward",

      value:
        model.rewards.nextReward ??
        "Keep collecting points!",
    },
  ];
}
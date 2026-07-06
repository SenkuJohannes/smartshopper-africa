import { WalletPassModel } from "../builder";
import { APPLE_WALLET_CONFIG } from "./config";

import {
  buildPrimaryFields,
  buildSecondaryFields,
  buildAuxiliaryFields,
  buildBackFields,
} from "./fields";

export interface AppleWalletPass {
  formatVersion: number;

  passTypeIdentifier: string;

  serialNumber: string;

  teamIdentifier: string;

  organizationName: string;

  description: string;

  logoText: string;

  foregroundColor: string;

  backgroundColor: string;

  labelColor: string;

  barcode: {
    format: string;
    message: string;
    messageEncoding: string;
  };

  storeCard: {
    primaryFields: any[];
    secondaryFields: any[];
    auxiliaryFields: any[];
    backFields: any[];
  };
}

export function buildApplePass(
  model: WalletPassModel
): AppleWalletPass {
  return {
    formatVersion: APPLE_WALLET_CONFIG.formatVersion,

    passTypeIdentifier:
      APPLE_WALLET_CONFIG.passTypeIdentifier,

    teamIdentifier:
      APPLE_WALLET_CONFIG.teamIdentifier,

    serialNumber: model.loyalty.memberNumber,

    organizationName: model.business.name,

    description: `${model.business.name} Loyalty Card`,

    logoText: model.business.name,

    foregroundColor:
      model.business.secondaryColor ?? "#FFFFFF",

    backgroundColor:
      model.business.primaryColor ?? "#16a34a",

    labelColor:
      model.business.secondaryColor ?? "#FFFFFF",

    barcode: {
      format: "PKBarcodeFormatQR",
      message: model.qrCode,
      messageEncoding: "iso-8859-1",
    },

    storeCard: {
      primaryFields: buildPrimaryFields(model),

      secondaryFields: buildSecondaryFields(model),

      auxiliaryFields: buildAuxiliaryFields(model),

      backFields: buildBackFields(model),
    },
  };
}
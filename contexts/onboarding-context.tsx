"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export type LoyaltyType =
  | "points"
  | "visits"
  | "cashback"
  | "membership";

export type SubscriptionPlan =
  | "trial"
  | "starter"
  | "growth"
  | "enterprise";

export interface OnboardingData {
  // Business Information
  businessName: string;
  industry: string;

  ownerName: string;
  email: string;
  phone: string;

  website: string;

  address: string;
  city: string;
  province: string;
  country: string;

  currency: string;
  timezone: string;

  locations: number;

  // Branding
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  welcomeMessage: string;

  // Loyalty
  loyaltyType: LoyaltyType;

  // Subscription
  subscription: SubscriptionPlan;
}

const defaultValues: OnboardingData = {
  // Business Information
  businessName: "",
  industry: "",

  ownerName: "",
  email: "",
  phone: "",

  website: "",

  address: "",
  city: "",
  province: "",
  country: "",

  currency: "ZAR",
  timezone: "Africa/Johannesburg",

  locations: 1,

  // Branding
  logo: "",
  primaryColor: "#16a34a",
  secondaryColor: "#ffffff",
  welcomeMessage: "",

  // Loyalty
  loyaltyType: "points",

  // Subscription
  subscription: "trial",
};

interface OnboardingContextType {
  data: OnboardingData;

  update: (values: Partial<OnboardingData>) => void;

  reset: () => void;
}

const OnboardingContext =
  createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [data, setData] =
    useState<OnboardingData>(defaultValues);

  function update(values: Partial<OnboardingData>) {
    setData((previous) => ({
      ...previous,
      ...values,
    }));
  }

  function reset() {
    setData(defaultValues);
  }

  return (
    <OnboardingContext.Provider
      value={{
        data,
        update,
        reset,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error(
      "useOnboarding must be used within an OnboardingProvider"
    );
  }

  return context;
}
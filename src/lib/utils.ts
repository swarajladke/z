import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { LicenseType } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getLicenseMultiplier(license: LicenseType): number {
  switch (license) {
    case "personal":
      return 1;
    case "commercial":
      return 1.5;
    case "extended":
      return 2.5;
    default:
      return 1;
  }
}

export function calculateLicensePrice(basePrice: number, license: LicenseType): number {
  if (basePrice === 0) return 0;
  return Math.round(basePrice * getLicenseMultiplier(license));
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { LicenseType } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Reliable fallback SVG placeholder URL for broken previews
export const FALLBACK_IMAGE_DATA_URL =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='100%' height='100%' fill='%231E293B'/><g text-anchor='middle' font-family='sans-serif'><text x='50%' y='48%' font-size='24' font-weight='bold' fill='%2306B6D4'>KALASTOCK ASSET</text><text x='50%' y='55%' font-size='14' fill='%2394A3B8'>Preview Asset Image</text></g></svg>";

/**
 * Format integer paise into formatted INR string (e.g. 14900 paise -> ₹149)
 */
export function formatPaiseToINR(paise: number): string {
  const rupees = Math.floor(paise / 100);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(rupees);
}

/**
 * Format rupees into formatted INR string (e.g. 149 -> ₹149)
 */
export function formatCurrency(rupees: number): string {
  return formatPaiseToINR(Math.round(rupees * 100));
}

/**
 * Single source of truth for license price multiplier
 * Personal: 1.0x
 * Commercial: 1.5x
 * Extended: 2.5x
 */
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

/**
 * Single shared pricing calculation function operating on integer paise.
 * Avoids any ₹223 vs ₹224 rounding discrepancies across pages.
 */
export function calculateLicensePricePaise(basePaise: number, license: LicenseType): number {
  if (basePaise === 0) return 0;
  // Use Math.floor to ensure consistent integer paise calculation (14900 * 1.5 = 22350 paise -> ₹223)
  return Math.floor(basePaise * getLicenseMultiplier(license));
}

export function calculateLicensePrice(baseRupees: number, license: LicenseType): number {
  const basePaise = Math.round(baseRupees * 100);
  const calculatedPaise = calculateLicensePricePaise(basePaise, license);
  return Math.floor(calculatedPaise / 100);
}

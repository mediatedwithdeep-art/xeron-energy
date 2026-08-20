/**
 * Solar sizing, subsidy and savings maths.
 *
 * Single source of truth for every calculator on the site. The homepage teaser
 * and the full /solar-calculator page both read from here so their numbers can
 * never disagree with each other.
 *
 * Everything here is an indicative planning model, not a quotation. The
 * assumptions are deliberately exported and rendered on the page — a customer
 * who can see the inputs can challenge them, which is the point.
 */

export type PropertyType = "residential" | "commercial" | "industrial";

/** Tune these as market rates move. They are shown to the user on the calculator page. */
export const ASSUMPTIONS = {
  /** Units (kWh) generated per kW of installed capacity per day, averaged across the year for Gujarat. */
  generationPerKwPerDay: 4,
  /** Share of the existing bill a correctly sized system is expected to offset. */
  billOffset: 0.7,
  /** Shadow-free roof area needed per kW, in square feet. */
  sqftPerKw: 100,
  /** Annual module output degradation. */
  degradationPerYear: 0.005,
  /** Plant design life used for lifetime totals. */
  lifetimeYears: 25,
  /** Default grid tariff in ₹ per unit, by property type. Users can override this. */
  defaultTariff: {
    residential: 8,
    commercial: 9.5,
    industrial: 8.5,
  } satisfies Record<PropertyType, number>,
} as const;

/**
 * Indicative installed cost per kW in ₹, before subsidy.
 * Larger plants cost materially less per kW — a flat rate overstates big systems.
 */
export function costPerKw(kw: number): number {
  if (kw <= 3) return 58000;
  if (kw <= 10) return 52000;
  if (kw <= 50) return 45000;
  if (kw <= 100) return 42000;
  return 38000;
}

/**
 * PM Surya Ghar: Muft Bijli Yojana central financial assistance.
 *
 * ₹30,000/kW for the first 2 kW, ₹18,000/kW for the third, capped at ₹78,000.
 * So 1 kW → ₹30,000, 2 kW → ₹60,000, 3 kW and above → ₹78,000.
 *
 * Residential grid-connected rooftop only — commercial and industrial systems
 * get no subsidy under this scheme, which is why propertyType is required.
 *
 * These rates are set by the Government of India and do change; if they move,
 * this function is the only place to update.
 */
export function pmSuryaGharSubsidy(kw: number, propertyType: PropertyType): number {
  if (propertyType !== "residential" || kw <= 0) return 0;
  if (kw <= 2) return Math.round(kw * 30000);
  return Math.min(78000, Math.round(60000 + (kw - 2) * 18000));
}

/** Recommended system size in kW for a given monthly bill. */
export function sizeFromBill(monthlyBill: number, tariff: number): number {
  const dailyUnits = monthlyBill / tariff / 30;
  const kw = dailyUnits / ASSUMPTIONS.generationPerKwPerDay;
  return Math.max(1, Math.round(kw * 10) / 10);
}

/** Largest system a given shadow-free roof area can carry. */
export function sizeFromRoofArea(sqft: number): number {
  return Math.max(0, Math.round((sqft / ASSUMPTIONS.sqftPerKw) * 10) / 10);
}

/** Monthly units a system of this size is expected to generate. */
export function monthlyGeneration(kw: number): number {
  return kw * ASSUMPTIONS.generationPerKwPerDay * 30;
}

/**
 * Lifetime savings, accounting for module degradation.
 *
 * Deliberately ignores grid tariff escalation, which historically runs 3–5% a
 * year and would push this number considerably higher. Leaving it out keeps the
 * figure conservative — the real outcome should beat it, not miss it.
 */
export function lifetimeSavings(yearlySaving: number): number {
  let total = 0;
  for (let year = 0; year < ASSUMPTIONS.lifetimeYears; year++) {
    total += yearlySaving * Math.pow(1 - ASSUMPTIONS.degradationPerYear, year);
  }
  return total;
}

export type SavingsEstimate = {
  systemKw: number;
  grossCost: number;
  subsidy: number;
  netCost: number;
  monthlySaving: number;
  yearlySaving: number;
  paybackYears: number;
  lifetimeNet: number;
  monthlyUnits: number;
  roofAreaSqft: number;
};

export function estimateSavings({
  monthlyBill,
  propertyType,
  tariff,
}: {
  monthlyBill: number;
  propertyType: PropertyType;
  tariff?: number;
}): SavingsEstimate {
  const rate = tariff ?? ASSUMPTIONS.defaultTariff[propertyType];
  const systemKw = sizeFromBill(monthlyBill, rate);
  const grossCost = systemKw * costPerKw(systemKw);
  const subsidy = pmSuryaGharSubsidy(systemKw, propertyType);
  const netCost = Math.max(0, grossCost - subsidy);
  const monthlySaving = monthlyBill * ASSUMPTIONS.billOffset;
  const yearlySaving = monthlySaving * 12;

  return {
    systemKw,
    grossCost,
    subsidy,
    netCost,
    monthlySaving,
    yearlySaving,
    paybackYears: yearlySaving > 0 ? netCost / yearlySaving : 0,
    lifetimeNet: lifetimeSavings(yearlySaving) - netCost,
    monthlyUnits: monthlyGeneration(systemKw),
    roofAreaSqft: Math.round(systemKw * ASSUMPTIONS.sqftPerKw),
  };
}

/** ₹ formatter using the Indian numbering system (lakh / crore grouping). */
export const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

/** Compact ₹ for large figures: ₹1.6 Cr, ₹34.2 L. */
export function inrCompact(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (abs >= 1_00_000) return `₹${(n / 1_00_000).toFixed(1)} L`;
  return inr(n);
}

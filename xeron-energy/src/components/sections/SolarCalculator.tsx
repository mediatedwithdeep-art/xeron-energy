"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiZap,
  FiTrendingUp,
  FiClock,
  FiSun,
  FiHome,
  FiMaximize,
  FiAward,
  FiActivity,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import Button from "@/components/ui/Button";
import {
  ASSUMPTIONS,
  costPerKw,
  estimateSavings,
  inr,
  inrCompact,
  monthlyGeneration,
  pmSuryaGharSubsidy,
  sizeFromRoofArea,
  type PropertyType,
} from "@/lib/solar";
import { site } from "@/lib/site";

const tabs = [
  { id: "savings", label: "Bill savings", icon: FiTrendingUp },
  { id: "subsidy", label: "Subsidy", icon: FiAward },
  { id: "roof", label: "Roof space", icon: FiMaximize },
] as const;
type TabId = (typeof tabs)[number]["id"];

export default function SolarCalculator() {
  const [tab, setTab] = useState<TabId>("savings");

  return (
    <div className="mx-auto max-w-5xl">
      <div
        role="tablist"
        aria-label="Solar calculators"
        className="mb-8 flex flex-wrap justify-center gap-2"
      >
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={active}
              aria-controls={`panel-${t.id}`}
              id={`tab-${t.id}`}
              onClick={() => setTab(t.id)}
              data-cursor="hover"
              className={`relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                active ? "text-void" : "text-mist hover:text-frost"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="calc-tab-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-solar-bright to-ember"
                  transition={{ type: "spring", stiffness: 300, damping: 26 }}
                />
              )}
              <Icon className="relative z-10 h-4 w-4" />
              <span className="relative z-10">{t.label}</span>
            </button>
          );
        })}
      </div>

      <div className="glass-strong sheen overflow-hidden rounded-[2rem] p-6 md:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            id={`panel-${tab}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {tab === "savings" && <SavingsCalculator />}
            {tab === "subsidy" && <SubsidyCalculator />}
            {tab === "roof" && <RoofCalculator />}
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="mt-6 text-center text-xs leading-relaxed text-muted-ink">
        Indicative planning estimates, not a quotation. Your actual generation depends on
        roof orientation, shading, your DISCOM tariff and the weather.{" "}
        <a href="/contact" className="underline transition-colors hover:text-solar">
          Book a free site audit
        </a>{" "}
        for exact, written numbers.
      </p>
    </div>
  );
}

/* ── Property type selector ─────────────────────────────────────────────── */

const propertyOptions: { id: PropertyType; label: string }[] = [
  { id: "residential", label: "Home" },
  { id: "commercial", label: "Shop / Office" },
  { id: "industrial", label: "Factory" },
];

function PropertyPicker({
  value,
  onChange,
}: {
  value: PropertyType;
  onChange: (v: PropertyType) => void;
}) {
  return (
    <div>
      <span className="mb-2 block text-sm text-mist">Property type</span>
      <div className="flex flex-wrap gap-2">
        {propertyOptions.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            aria-pressed={value === o.id}
            data-cursor="hover"
            className={`rounded-xl border px-4 py-2.5 text-sm transition-colors ${
              value === o.id
                ? "border-solar/60 bg-solar/10 text-frost"
                : "border-white/10 bg-white/5 text-mist hover:text-frost"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Slider({
  id,
  min,
  max,
  step,
  value,
  onChange,
  minLabel,
  maxLabel,
  valueText,
}: {
  id: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (n: number) => void;
  minLabel: string;
  maxLabel: string;
  valueText: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuetext={valueText}
        className="mt-6 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-solar"
        style={{
          background: `linear-gradient(to right, var(--color-solar), var(--color-ember) ${pct}%, rgba(255,255,255,0.1) ${pct}%)`,
        }}
      />
      <div className="mt-2 flex justify-between text-xs text-muted-ink">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </>
  );
}

/* ── 1. Bill → savings ──────────────────────────────────────────────────── */

function SavingsCalculator() {
  const [bill, setBill] = useState(6000);
  const [property, setProperty] = useState<PropertyType>("residential");
  const [tariff, setTariff] = useState<number | null>(null);

  const rate = tariff ?? ASSUMPTIONS.defaultTariff[property];
  const r = useMemo(
    () => estimateSavings({ monthlyBill: bill, propertyType: property, tariff: rate }),
    [bill, property, rate]
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
      <div className="flex flex-col justify-center">
        <label htmlFor="bill" className="text-sm text-mist">
          Your average monthly electricity bill
        </label>
        <div className="mt-2 font-display text-5xl font-semibold text-frost">
          {inr(bill)}
          <span className="text-lg font-normal text-muted-ink"> / mo</span>
        </div>
        <Slider
          id="bill"
          min={1000}
          max={200000}
          step={500}
          value={bill}
          onChange={setBill}
          minLabel="₹1,000"
          maxLabel="₹2,00,000"
          valueText={`${inr(bill)} per month`}
        />

        <div className="mt-7">
          <PropertyPicker
            value={property}
            onChange={(v) => {
              setProperty(v);
              setTariff(null);
            }}
          />
        </div>

        <div className="mt-6">
          <label htmlFor="tariff" className="mb-1.5 block text-sm text-mist">
            Your tariff (₹ per unit)
          </label>
          <input
            id="tariff"
            type="number"
            min={1}
            max={30}
            step={0.5}
            value={rate}
            onChange={(e) => setTariff(Number(e.target.value) || null)}
            className="w-32 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-frost outline-none transition-colors focus:border-solar/60"
          />
          <p className="mt-1.5 text-xs text-muted-ink">
            Check the per-unit rate on your bill for a sharper estimate.
          </p>
        </div>

        <div className="mt-7 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-solar/15 to-transparent p-4">
          <FiSun className="h-6 w-6 shrink-0 text-solar" />
          <p className="text-sm text-mist">
            Recommended system:{" "}
            <span className="font-semibold text-frost">{r.systemKw} kW</span>
            {" · "}needs about{" "}
            <span className="font-semibold text-frost">
              {r.roofAreaSqft.toLocaleString("en-IN")} sq ft
            </span>{" "}
            of shadow-free roof
          </p>
        </div>

        <div className="mt-6">
          <Button href="/contact">Get My Exact Quote</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ResultCard icon={<FiTrendingUp />} label="Monthly savings" value={inr(r.monthlySaving)} accent="text-volt" />
        <ResultCard icon={<FiZap />} label="Yearly savings" value={inr(r.yearlySaving)} accent="text-solar" />
        <ResultCard icon={<FiClock />} label="Payback period" value={`${r.paybackYears.toFixed(1)} yrs`} accent="text-flux" />
        <ResultCard
          icon={<FiSun />}
          label={property === "residential" ? "Govt. subsidy" : "Subsidy (N/A)"}
          value={r.subsidy > 0 ? inr(r.subsidy) : "—"}
          accent="text-halo"
        />
        <ResultCard icon={<FiActivity />} label="System cost before subsidy" value={inrCompact(r.grossCost)} accent="text-mist" />
        <ResultCard icon={<FiHome />} label="Your net cost" value={inrCompact(r.netCost)} accent="text-frost" />

        <div className="col-span-2 rounded-2xl bg-gradient-to-br from-volt/20 via-transparent to-transparent p-5">
          <p className="text-sm text-mist">
            Net savings over {ASSUMPTIONS.lifetimeYears} years, after paying for the system
          </p>
          <p className="mt-1 font-display text-3xl font-semibold text-volt md:text-4xl">
            {inrCompact(r.lifetimeNet)}
          </p>
          <p className="mt-1.5 text-xs text-muted-ink">
            Includes {(ASSUMPTIONS.degradationPerYear * 100).toFixed(1)}% a year panel
            degradation. Assumes today&apos;s tariff throughout — if grid rates rise, as they
            historically have, you save more than this.
          </p>
        </div>

        {property !== "residential" && (
          <p className="col-span-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs leading-relaxed text-muted-ink">
            The PM Surya Ghar subsidy covers residential rooftops only. Commercial and
            industrial plants have no subsidy under this scheme, but qualify for accelerated
            depreciation and the full cost is a business expense — ask us how that changes
            your effective payback.
          </p>
        )}
      </div>
    </div>
  );
}

/* ── 2. System size → subsidy ───────────────────────────────────────────── */

const subsidySteps = [
  { range: "First 2 kW", rate: "₹30,000 per kW" },
  { range: "3rd kW", rate: "₹18,000 per kW" },
  { range: "3 kW and above", rate: "₹78,000 total (capped)" },
];

function SubsidyCalculator() {
  const [kw, setKw] = useState(3);
  const subsidy = pmSuryaGharSubsidy(kw, "residential");
  const gross = kw * costPerKw(kw);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
      <div className="flex flex-col justify-center">
        <label htmlFor="kw" className="text-sm text-mist">
          Residential system size
        </label>
        <div className="mt-2 font-display text-5xl font-semibold text-frost">
          {kw}
          <span className="text-lg font-normal text-muted-ink"> kW</span>
        </div>
        <Slider
          id="kw"
          min={1}
          max={10}
          step={0.5}
          value={kw}
          onChange={setKw}
          minLabel="1 kW"
          maxLabel="10 kW"
          valueText={`${kw} kilowatts`}
        />

        <div className="mt-8 space-y-2">
          <p className="text-sm font-medium text-frost">
            How PM Surya Ghar is calculated
          </p>
          {subsidySteps.map((s) => (
            <div
              key={s.range}
              className="flex items-center justify-between rounded-xl border border-white/8 bg-white/5 px-4 py-2.5 text-sm"
            >
              <span className="text-mist">{s.range}</span>
              <span className="font-medium text-frost">{s.rate}</span>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Button href="/contact">We&apos;ll File It For You</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 rounded-2xl bg-gradient-to-br from-halo/20 via-transparent to-transparent p-6">
          <p className="text-sm text-mist">Central subsidy you can claim</p>
          <p className="mt-1 font-display text-4xl font-semibold text-halo md:text-5xl">
            {inr(subsidy)}
          </p>
          {kw >= 3 && (
            <p className="mt-2 text-xs text-muted-ink">
              You have hit the ₹78,000 ceiling — going larger than 3 kW adds no further
              subsidy, though it does add generation.
            </p>
          )}
        </div>

        <ResultCard icon={<FiActivity />} label="System cost before subsidy" value={inrCompact(gross)} accent="text-mist" />
        <ResultCard icon={<FiHome />} label="Your net cost" value={inrCompact(Math.max(0, gross - subsidy))} accent="text-frost" />
        <ResultCard icon={<FiZap />} label="Expected generation" value={`${Math.round(monthlyGeneration(kw)).toLocaleString("en-IN")} units/mo`} accent="text-solar" />
        <ResultCard icon={<FiMaximize />} label="Roof area needed" value={`${Math.round(kw * ASSUMPTIONS.sqftPerKw).toLocaleString("en-IN")} sq ft`} accent="text-flux" />

        <p className="col-span-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs leading-relaxed text-muted-ink">
          Subsidy rates are set by the Government of India and can change without notice.
          Xeron files your application at no charge, and the sanction decision rests with
          the government and your DISCOM. We never route subsidy money through ourselves —
          it is credited directly to your bank account.
        </p>
      </div>
    </div>
  );
}

/* ── 3. Roof area → system size ─────────────────────────────────────────── */

function RoofCalculator() {
  const [sqft, setSqft] = useState(600);
  const kw = sizeFromRoofArea(sqft);
  const units = monthlyGeneration(kw);
  const worth = units * ASSUMPTIONS.defaultTariff.residential;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
      <div className="flex flex-col justify-center">
        <label htmlFor="sqft" className="text-sm text-mist">
          Shadow-free roof area
        </label>
        <div className="mt-2 font-display text-5xl font-semibold text-frost">
          {sqft.toLocaleString("en-IN")}
          <span className="text-lg font-normal text-muted-ink"> sq ft</span>
        </div>
        <Slider
          id="sqft"
          min={100}
          max={20000}
          step={50}
          value={sqft}
          onChange={setSqft}
          minLabel="100 sq ft"
          maxLabel="20,000 sq ft"
          valueText={`${sqft} square feet`}
        />

        <div className="mt-8 flex items-start gap-3 rounded-2xl bg-gradient-to-r from-flux/15 to-transparent p-4">
          <FiMaximize className="mt-0.5 h-5 w-5 shrink-0 text-flux" />
          <p className="text-sm leading-relaxed text-mist">
            Measure only the area that stays clear of shadow through the day — water tanks,
            parapet walls, stairwells and neighbouring buildings all cast shade that costs
            you generation. Our site audit maps this properly.
          </p>
        </div>

        <div className="mt-6">
          <Button href="/contact">Book a Free Roof Audit</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 rounded-2xl bg-gradient-to-br from-solar/20 via-transparent to-transparent p-6">
          <p className="text-sm text-mist">Largest system this roof can carry</p>
          <p className="mt-1 font-display text-4xl font-semibold text-solar md:text-5xl">
            {kw} kW
          </p>
          <p className="mt-2 text-xs text-muted-ink">
            Based on about {ASSUMPTIONS.sqftPerKw} sq ft per kW for standard modules.
          </p>
        </div>

        <ResultCard icon={<FiZap />} label="Monthly generation" value={`${Math.round(units).toLocaleString("en-IN")} units`} accent="text-solar" />
        <ResultCard icon={<FiTrendingUp />} label="That electricity is worth" value={`${inr(worth)}/mo`} accent="text-volt" />
        <ResultCard icon={<FiActivity />} label="Indicative cost" value={inrCompact(kw * costPerKw(kw))} accent="text-mist" />
        <ResultCard
          icon={<FiAward />}
          label="If residential, subsidy"
          value={inr(pmSuryaGharSubsidy(kw, "residential"))}
          accent="text-halo"
        />

        <div className="col-span-2 flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="flex-1 text-xs leading-relaxed text-muted-ink">
            Not sure of your roof area? Send us a photo and we will size it for you.
          </p>
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-medium text-frost transition-colors hover:text-solar"
          >
            <FaWhatsapp className="h-4 w-4" /> Send a roof photo
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── shared result tile ─────────────────────────────────────────────────── */

function ResultCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <motion.div
      key={value}
      initial={{ opacity: 0.4, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="glass rounded-2xl p-5"
    >
      <div className={`mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ${accent}`}>
        {icon}
      </div>
      <p className="text-xs text-muted-ink">{label}</p>
      <p className={`mt-0.5 font-display text-xl font-semibold ${accent}`}>{value}</p>
    </motion.div>
  );
}

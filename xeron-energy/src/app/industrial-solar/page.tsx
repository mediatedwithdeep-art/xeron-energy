import type { Metadata } from "next";
import SolutionPage, { type SolutionData } from "@/components/sections/SolutionPage";
import { TbBuildingFactory2 } from "react-icons/tb";
import { FiActivity, FiServer, FiShield, FiZap, FiTrendingUp } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Industrial Solar",
  description:
    "MW-scale captive and open-access solar plants for factories and industrial estates. SCADA-grade monitoring, verified generation (PLF) reporting and engineering built for harsh duty cycles by Xeron Energy.",
};

const data: SolutionData = {
  crumb: "Industrial Solar",
  eyebrow: "For industry",
  title: (
    <>
      Megawatt-scale power, <span className="text-aurora">engineered for uptime.</span>
    </>
  ),
  description:
    "High-availability captive and open-access solar for factories and estates. Built for demanding duty cycles, monitored to SCADA standards, with generation reported to you monthly.",
  metrics: [
    { value: 30, suffix: "%", label: "Typical energy cost cut" },
    { value: 24, suffix: "×7", label: "SCADA monitoring" },
    { value: 25, suffix: " yr", label: "Plant design life" },
    { value: 18, suffix: " yr", label: "Engineering experience" },
  ],
  overviewTitle: (
    <>
      When downtime costs <span className="text-aurora">lakhs per hour</span>
    </>
  ),
  overview: [
    "Industrial energy is mission-critical. A megawatt plant that underperforms or fails isn't an inconvenience — it's a direct hit to production and margin. Xeron engineers for the reliability that heavy industry demands.",
    "We design captive and open-access plants with redundant string architecture, industrial-grade inverters and SCADA-class monitoring that surfaces issues before they become outages.",
    "Our founders' 18 years in government power infrastructure mean we understand grid interaction, protection systems and duty cycles at a level most solar firms simply can't match.",
  ],
  deliverables: [
    "MW-scale ground-mount & rooftop plants",
    "Captive & open-access power structuring",
    "Redundant string & inverter architecture",
    "SCADA-grade monitoring & analytics",
    "Grid-protection & synchronisation systems",
    "Written PLF (generation) estimate before you sign",
    "Preventive & predictive maintenance",
    "Regulatory & open-access compliance",
  ],
  features: [
    { icon: TbBuildingFactory2, title: "Utility-Grade Build", desc: "Industrial mounting, cabling and protection rated for decades of harsh operation." },
    { icon: FiServer, title: "SCADA Monitoring", desc: "String-level telemetry and analytics that predict faults before they cost you output." },
    { icon: FiZap, title: "Verified PLF", desc: "A written plant load factor estimate up front, then actual generation reported to you monthly from live data." },
    { icon: FiShield, title: "Grid Protection", desc: "Engineered synchronisation and protection systems from real power-sector veterans." },
    { icon: FiTrendingUp, title: "Captive Economics", desc: "Structure captive or open-access power to slash your industrial tariff exposure." },
    { icon: FiActivity, title: "Predictive O&M", desc: "Data-driven maintenance maximises availability across the plant's full life." },
  ],
};

export default function IndustrialSolarPage() {
  return <SolutionPage data={data} />;
}

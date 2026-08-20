import type { Metadata } from "next";
import SolutionPage, { type SolutionData } from "@/components/sections/SolutionPage";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { FiTrendingDown, FiBarChart2, FiSun, FiDollarSign, FiMonitor } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Commercial Solar",
  description:
    "Commercial rooftop and carport solar for showrooms, hospitals, hotels and offices. Slash demand charges, lock energy costs for 25 years, and monitor generation remotely with Xeron Energy.",
};

const data: SolutionData = {
  crumb: "Commercial Solar",
  eyebrow: "For businesses",
  title: (
    <>
      Turn your rooftop into a <span className="text-aurora">profit centre.</span>
    </>
  ),
  description:
    "Purpose-built rooftop and carport arrays for commercial properties. Cut operating costs, hedge against tariff hikes and back your sustainability reporting with metered generation.",
  metrics: [
    { value: 40, suffix: "%", label: "Typical energy cost cut" },
    { value: 250, suffix: " kW", label: "Typical system size" },
    { value: 4, suffix: " yr", label: "Indicative payback" },
    { value: 25, suffix: " yr", label: "Asset design life" },
  ],
  overviewTitle: (
    <>
      Energy is your second-largest <span className="text-aurora">controllable cost</span>
    </>
  ),
  overview: [
    "For most commercial operations — showrooms, hospitals, hotels, offices and retail — electricity is a relentless monthly drain that only rises. Solar converts that expense into a fixed, predictable and eventually free asset.",
    "Xeron designs around your load curve and demand charges, not just your roof area. We model tariff slabs, maximise self-consumption and structure the system for the fastest possible payback.",
    "Choose CAPEX ownership for maximum long-term return, or an OPEX model with zero upfront cost — either way, generation is monitored remotely and maintained for decades.",
  ],
  deliverables: [
    "Load-curve & demand-charge analysis",
    "Rooftop, carport & shade-structure arrays",
    "CAPEX and OPEX financing models",
    "Peak-demand & tariff-slab optimisation",
    "Remote performance dashboards",
    "Preventive maintenance contracts",
    "Net-metering & regulatory compliance",
    "ESG & sustainability reporting support",
  ],
  features: [
    { icon: FiTrendingDown, title: "Demand-Charge Cuts", desc: "Reduce peak demand penalties, not just energy units — the savings most installers miss." },
    { icon: FiDollarSign, title: "Flexible Financing", desc: "CAPEX for maximum ROI or OPEX with zero upfront investment. Your call." },
    { icon: HiOutlineOfficeBuilding, title: "Rooftop & Carport", desc: "Every usable surface engineered for generation, including elegant carport canopies." },
    { icon: FiMonitor, title: "Live Dashboards", desc: "Track generation, savings and carbon offset in real time from any device." },
    { icon: FiBarChart2, title: "Fast Payback", desc: "Typical commercial systems pay for themselves in 3–5 years, then generate for 20 more." },
    { icon: FiSun, title: "Brand Leadership", desc: "Visible sustainability that customers, staff and investors increasingly expect." },
  ],
};

export default function CommercialSolarPage() {
  return <SolutionPage data={data} />;
}

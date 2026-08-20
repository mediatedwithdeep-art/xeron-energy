import type { IconType } from "react-icons";
import {
  FiSun,
  FiHome,
  FiTool,
  FiTrendingUp,
  FiShield,
  FiZap,
  FiAward,
  FiClock,
  FiHeadphones,
  FiCheckCircle,
  FiBattery,
  FiActivity,
} from "react-icons/fi";
import { HiOutlineOfficeBuilding, HiOutlineChip } from "react-icons/hi";
import { TbSolarPanel, TbBuildingFactory2 } from "react-icons/tb";

/**
 * Canonical public URL.
 *
 * Set NEXT_PUBLIC_SITE_URL in your hosting dashboard the moment you buy a domain
 * (e.g. https://xeronenergy.in). Until then the Vercel preview URL is used, which
 * keeps canonical tags, the sitemap and JSON-LD schema pointing at a real address
 * instead of a domain that does not resolve.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const site = {
  name: "Xeron Energy",
  legalName: "Xeron Energy Solar EPC",
  tagline: "Cut Your Electricity Bill by up to 70%.",
  shortTagline: "Powering India's Solar Future",
  description:
    "Xeron Energy is a Rajkot-based Solar EPC contractor delivering turnkey residential, commercial and industrial solar power plants across Gujarat. Founded by electrical engineers with 18 years of government power-sector experience, and we file your PM Surya Ghar subsidy of up to ₹78,000.",
  phone: "+91 8320545680",
  phoneHref: "tel:+918320545680",
  whatsapp: "918320545680",
  whatsappHref: "https://wa.me/918320545680",
  address: {
    line: "Rajkot, Gujarat",
    city: "Rajkot",
    state: "Gujarat",
    postalCode: "360490",
    country: "IN",
  },
  hours: {
    label: "Mon–Sat · 9:00 AM – 7:00 PM",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "19:00",
  },
  url: siteUrl,
  /** Years of electrical engineering experience the founding team brings from the government power sector. */
  experienceYears: 18,
  /**
   * Add profile URLs here once each account is live and has real posts on it.
   * Empty entries are hidden from the footer and left out of the search-engine
   * schema — an empty or bare-domain link is worse than no link at all.
   */
  social: {
    linkedin: "",
    instagram: "",
    youtube: "",
    facebook: "",
  },
} as const;

export type NavLink = { label: string; href: string; description?: string };

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Solar EPC", href: "/solar-epc" },
  { label: "Commercial", href: "/commercial-solar" },
  { label: "Industrial", href: "/industrial-solar" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Why Us", href: "/why-choose-us" },
  { label: "Process", href: "/process" },
  { label: "Calculator", href: "/solar-calculator" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

/** Pages listed in sitemap.xml but kept out of the main navigation. */
export const utilityLinks: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export const megaMenu: {
  title: string;
  links: NavLink[];
}[] = [
  {
    title: "Solutions",
    links: [
      { label: "Solar EPC", href: "/solar-epc", description: "Turnkey engineering, procurement & construction" },
      { label: "Commercial Solar", href: "/commercial-solar", description: "Rooftop & carport systems for businesses" },
      { label: "Industrial Solar", href: "/industrial-solar", description: "MW-scale plants & captive power" },
      { label: "Services", href: "/services", description: "Design, install, O&M and financing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Xeron", href: "/about", description: "18 years of electrical engineering" },
      { label: "Why Choose Us", href: "/why-choose-us", description: "The Xeron advantage" },
      { label: "Our Process", href: "/process", description: "From audit to activation in 6 steps" },
      { label: "Projects", href: "/projects", description: "Installations across Gujarat" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Solar Calculator", href: "/solar-calculator", description: "Savings, subsidy and roof-size estimates" },
      { label: "FAQ", href: "/faq", description: "Everything you need to know" },
      { label: "Contact", href: "/contact", description: "Book your free site audit" },
      { label: "Privacy Policy", href: "/privacy", description: "How we handle your data" },
    ],
  },
];

export type Stat = { value: number; prefix?: string; suffix: string; label: string; icon: IconType };

/**
 * Every figure below is a verifiable fact about what Xeron offers — the founding
 * team's experience, the statutory subsidy ceiling, and standard Tier-1 warranty
 * terms. Do not add installation counts or MW-deployed figures here until they
 * are backed by commissioning certificates you can produce on request.
 */
export const stats: Stat[] = [
  { value: 18, suffix: "+", label: "Years of Electrical Engineering", icon: FiAward },
  { value: 78000, prefix: "₹", suffix: "", label: "Max PM Surya Ghar Subsidy Filed", icon: FiTrendingUp },
  { value: 25, suffix: " yr", label: "Module Performance Warranty", icon: FiShield },
  { value: 24, suffix: "×7", label: "Generation Monitoring", icon: FiActivity },
];

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: IconType;
  features: string[];
};

export const services: Service[] = [
  {
    slug: "solar-epc",
    title: "Solar EPC",
    short: "End-to-end engineering, procurement & construction.",
    description:
      "A single accountable partner from feasibility to grid synchronisation. We engineer, procure Tier-1 components, and construct utility-grade solar plants with certified workmanship.",
    icon: TbSolarPanel,
    features: ["Structural & electrical design", "Tier-1 module procurement", "Certified installation crews", "Net-metering & liaisoning"],
  },
  {
    slug: "commercial-solar",
    title: "Commercial Solar",
    short: "Rooftop & carport systems that cut operating costs.",
    description:
      "Purpose-built rooftop and carport arrays for showrooms, hospitals, hotels and offices. Reduce demand charges and hedge your energy costs for the 25-year life of the plant.",
    icon: HiOutlineOfficeBuilding,
    features: ["Demand-charge optimisation", "Rooftop & carport arrays", "OPEX & CAPEX models", "Remote performance monitoring"],
  },
  {
    slug: "industrial-solar",
    title: "Industrial Solar",
    short: "MW-scale captive plants engineered for uptime.",
    description:
      "High-availability megawatt plants and captive power for factories and estates. Engineered for harsh duty cycles with SCADA-grade monitoring.",
    icon: TbBuildingFactory2,
    features: ["MW-scale ground mount", "Captive & open-access power", "SCADA monitoring", "Monthly generation (PLF) reporting"],
  },
  {
    slug: "installation-setup",
    title: "Installation & Setup",
    short: "Precision installation by certified crews.",
    description:
      "Mounting, string routing, inverter commissioning and safety testing performed to IS/IEC standards by in-house certified teams — never subcontracted.",
    icon: FiTool,
    features: ["IS/IEC compliant mounting", "Thermographic testing", "Earthing & lightning arrest", "Commissioning & handover"],
  },
  {
    slug: "maintenance-support",
    title: "Maintenance & Support",
    short: "O&M that protects your generation for the long run.",
    description:
      "Proactive operations & maintenance with module cleaning, inverter health checks and 24×7 remote monitoring to keep every unit generating at peak.",
    icon: FiHeadphones,
    features: ["24×7 remote monitoring", "Scheduled module cleaning", "Inverter health analytics", "Rapid on-site response"],
  },
  {
    slug: "consultation",
    title: "Consultation & Advisory",
    short: "Bankable advice from real engineers.",
    description:
      "Feasibility studies, subsidy structuring and ROI modelling from engineers with 18 years in the government power sector — clarity before you commit.",
    icon: FiActivity,
    features: ["Free site feasibility", "Subsidy structuring", "ROI & payback modelling", "Financing facilitation"],
  },
];

/**
 * Only three services have a page of their own; the rest are covered on
 * /services and convert best straight to an enquiry. Both the homepage grid and
 * the services page route through here — an ad-hoc check in one of them
 * previously missed "maintenance-support" and produced a 404.
 */
export const serviceRoute = (slug: string) =>
  (["solar-epc", "commercial-solar", "industrial-solar"] as const).some((s) => s === slug)
    ? `/${slug}`
    : "/services";

export type Benefit = { title: string; description: string; icon: IconType };

export const benefits: Benefit[] = [
  { title: "Up to 70% Lower Bills", description: "A correctly sized plant offsets most of your grid consumption and protects you from tariff hikes for 25+ years.", icon: FiTrendingUp },
  { title: "₹78,000 Subsidy", description: "We handle the entire PM Surya Ghar application so you receive the maximum subsidy you are eligible for.", icon: FiAward },
  { title: "Tier-1 Components", description: "Only bankable, DCR-compliant modules and inverters carrying 25-year performance warranties.", icon: FiShield },
  { title: "18 Years Expertise", description: "Founded by government-sector electrical engineers — real credentials, not resellers.", icon: FiClock },
  { title: "In-House Crews", description: "Installation is never subcontracted. Certified Xeron teams own the quality end to end.", icon: FiTool },
  { title: "Long-Term Monitoring", description: "24×7 remote generation monitoring and proactive O&M keep your plant performing at peak.", icon: FiActivity },
];

export type ProcessStep = { step: string; title: string; description: string; icon: IconType };

export const processSteps: ProcessStep[] = [
  { step: "01", title: "Free Site Audit", description: "Our engineers assess your roof, shadow profile and consumption to size the ideal system.", icon: FiHome },
  { step: "02", title: "Custom Design", description: "3D layout, generation simulation and a transparent quote with ROI and subsidy mapped out.", icon: HiOutlineChip },
  { step: "03", title: "Approvals & Subsidy", description: "We file DISCOM net-metering and your PM Surya Ghar subsidy — zero paperwork for you.", icon: FiCheckCircle },
  { step: "04", title: "Precision Install", description: "Certified in-house crews mount, wire and earth the plant to IS/IEC safety standards.", icon: FiTool },
  { step: "05", title: "Commissioning", description: "Thermographic testing, inverter commissioning and meter synchronisation before handover.", icon: FiZap },
  { step: "06", title: "Monitor & Maintain", description: "24×7 remote monitoring and scheduled O&M protect your generation for decades.", icon: FiBattery },
];

export type Project = {
  /** Client or site name. Use the client's actual name only with their written consent. */
  title: string;
  category: "Residential" | "Commercial" | "Industrial";
  /** City or town, e.g. "Rajkot". */
  location: string;
  /** Installed DC capacity as commissioned, e.g. "10 kW". */
  capacity: string;
  /** Annual saving. Quote only what the client's own bills show, e.g. "₹1.4L / yr". */
  savings: string;
  /** Tailwind gradient used for the card artwork. */
  gradient: string;
};

/**
 * ── ADD YOUR REAL COMMISSIONED PROJECTS HERE ──────────────────────────────────
 *
 * This list is intentionally empty. The previous placeholder entries were
 * invented and have been removed: publishing installations you have not built
 * is a misrepresentation under the Consumer Protection Act 2019 and is grounds
 * for suspension of a Google Business Profile.
 *
 * For each project you have actually commissioned, copy this block in and fill
 * it with figures you can evidence from the commissioning report and the
 * client's electricity bills:
 *
 *   {
 *     title: "Patel Residence Rooftop",
 *     category: "Residential",
 *     location: "Rajkot",
 *     capacity: "6 kW",
 *     savings: "₹78,000 / yr",
 *     gradient: "from-sky-500/30 to-blue-700/10",
 *   },
 *
 * Gradient options that match the site palette:
 *   from-sky-500/30 to-blue-700/10     from-cyan-500/30 to-blue-600/10
 *   from-blue-500/30 to-indigo-700/10  from-sky-400/30 to-cyan-700/10
 *
 * The homepage showcase, the /projects page and the sitemap all read from this
 * array — as soon as you add entries they appear everywhere automatically, and
 * while it is empty those sections show an honest "portfolio coming soon" state
 * instead of fabricated work.
 */
export const projects: Project[] = [];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "How much can I actually save with solar?",
    a: "A correctly sized rooftop system typically offsets 60–70% of a home's electricity bill, and commercial systems often save more by cutting peak demand charges. Your exact saving depends on your roof area, shadow profile and tariff — our free site audit gives you the real number for your property before you commit anything.",
  },
  {
    q: "What is the PM Surya Ghar subsidy and do I qualify?",
    a: "PM Surya Ghar: Muft Bijli Yojana offers residential rooftop subsidies up to ₹78,000. Most grid-connected homeowners qualify. Xeron files the entire application on your behalf so you receive the maximum eligible amount.",
  },
  {
    q: "How long does installation take?",
    a: "A typical residential system is designed, approved and commissioned within 3–5 weeks including subsidy and net-metering approvals. Commercial and industrial timelines depend on scale and are shared upfront in your proposal.",
  },
  {
    q: "What warranty and maintenance do I get?",
    a: "Tier-1 modules carry 25-year performance warranties and inverters 5–10 years, as provided by the manufacturer. Xeron provides 24×7 remote monitoring plus scheduled O&M so your plant keeps generating at peak.",
  },
  {
    q: "Do you handle DISCOM approvals and net metering?",
    a: "Yes. End-to-end liaisoning with your DISCOM for net-metering and sanction is included in every Xeron EPC engagement — you never chase paperwork.",
  },
  {
    q: "Is my roof suitable for solar?",
    a: "Most rooftops are. Our free site audit assesses orientation, shadow profile, structural capacity and consumption to confirm suitability and size the optimal system before you commit anything.",
  },
  {
    q: "Xeron is a new company — why should I trust you with my roof?",
    a: "Because the engineering behind it is not new. Xeron was founded by electrical engineers with 18 years in India's government power sector, working on substations and distribution networks where failure was not an option. We would rather tell you that plainly than pad a portfolio. Ask us for our engineering credentials, component datasheets and warranty documents before you sign anything — we will hand them over.",
  },
];

export type Partner = { name: string };

/** Component brands Xeron procures and installs. This is a procurement list, not a claim of sponsorship or dealership. */
export const partners: Partner[] = [
  { name: "Waaree" },
  { name: "Adani Solar" },
  { name: "Tata Power Solar" },
  { name: "Vikram Solar" },
  { name: "Growatt" },
  { name: "Sungrow" },
  { name: "Luminous" },
  { name: "Havells" },
];

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

export const site = {
  name: "Xeron Energy",
  legalName: "Xeron Energy Solar EPC",
  tagline: "Cut Your Electricity Bill by 70%. Permanently.",
  shortTagline: "Powering India's Solar Future",
  description:
    "Xeron Energy is Gujarat's premium Solar EPC contractor delivering turnkey residential, commercial and industrial solar power plants. Backed by 18 years of government-sector electrical expertise and the PM Surya Ghar subsidy up to ₹78,000.",
  phone: "+91 8320545680",
  phoneHref: "tel:+918320545680",
  whatsapp: "918320545680",
  whatsappHref: "https://wa.me/918320545680",
  email: "hello@xeronenergy.in",
  emailHref: "mailto:hello@xeronenergy.in",
  address: {
    line: "Rajkot, Gujarat",
    city: "Rajkot",
    state: "Gujarat",
    postalCode: "360490",
    country: "IN",
  },
  url: "https://xeronenergy.in",
  founded: "2006",
  experienceYears: 18,
  social: {
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    facebook: "https://facebook.com",
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
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
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
      { label: "About Xeron", href: "/about", description: "18 years of electrical excellence" },
      { label: "Why Choose Us", href: "/why-choose-us", description: "The Xeron advantage" },
      { label: "Our Process", href: "/process", description: "From audit to activation in 6 steps" },
      { label: "Projects", href: "/projects", description: "Installations across Gujarat" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Gallery", href: "/gallery", description: "Real installations, real results" },
      { label: "FAQ", href: "/faq", description: "Everything you need to know" },
      { label: "Contact", href: "/contact", description: "Book your free site audit" },
    ],
  },
];

export type Stat = { value: number; suffix: string; label: string; icon: IconType };

export const stats: Stat[] = [
  { value: 18, suffix: "+", label: "Years of Expertise", icon: FiAward },
  { value: 1200, suffix: "+", label: "Installations Delivered", icon: TbSolarPanel },
  { value: 45, suffix: " MW", label: "Clean Energy Deployed", icon: FiZap },
  { value: 70, suffix: "%", label: "Average Bill Reduction", icon: FiTrendingUp },
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
    short: "Rooftop & carport systems that slash operating costs.",
    description:
      "Purpose-built rooftop and carport arrays for showrooms, hospitals, hotels and offices. Reduce demand charges and lock energy costs for 25 years.",
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
    features: ["MW-scale ground mount", "Captive & open-access power", "SCADA monitoring", "Guaranteed generation (PLF)"],
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
    short: "O&M that protects your generation forever.",
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

export type Benefit = { title: string; description: string; icon: IconType };

export const benefits: Benefit[] = [
  { title: "70% Lower Bills", description: "Offset the majority of your grid consumption and protect against tariff hikes for 25+ years.", icon: FiTrendingUp },
  { title: "₹78,000 Subsidy", description: "We handle the entire PM Surya Ghar application so you receive the maximum government subsidy.", icon: FiAward },
  { title: "Tier-1 Components", description: "Only bankable, DCR-compliant modules and inverters with 25-year performance warranties.", icon: FiShield },
  { title: "18 Years Expertise", description: "Founded by government-sector electrical engineers — real credentials, not resellers.", icon: FiClock },
  { title: "In-House Crews", description: "Installation is never subcontracted. Certified Xeron teams own the quality end to end.", icon: FiTool },
  { title: "Lifetime Monitoring", description: "24×7 remote generation monitoring and proactive O&M keep your plant performing at peak.", icon: FiActivity },
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
  title: string;
  category: "Residential" | "Commercial" | "Industrial";
  location: string;
  capacity: string;
  savings: string;
  gradient: string;
};

export const projects: Project[] = [
  { title: "Riverside Villa Array", category: "Residential", location: "Rajkot", capacity: "10 kW", savings: "₹1.4L / yr", gradient: "from-sky-500/30 to-blue-700/10" },
  { title: "Auto Plaza Rooftop", category: "Commercial", location: "Morbi", capacity: "120 kW", savings: "₹16L / yr", gradient: "from-cyan-500/30 to-blue-600/10" },
  { title: "Ceramic Works Plant", category: "Industrial", location: "Wankaner", capacity: "1.2 MW", savings: "₹1.6Cr / yr", gradient: "from-blue-500/30 to-indigo-700/10" },
  { title: "Grand Residency Solar", category: "Residential", location: "Jamnagar", capacity: "8 kW", savings: "₹1.1L / yr", gradient: "from-sky-400/30 to-cyan-700/10" },
  { title: "MediCare Hospital", category: "Commercial", location: "Rajkot", capacity: "250 kW", savings: "₹34L / yr", gradient: "from-sky-500/30 to-indigo-600/10" },
  { title: "Textile Mega Mill", category: "Industrial", location: "Surat", capacity: "2.4 MW", savings: "₹3.1Cr / yr", gradient: "from-cyan-500/30 to-blue-700/10" },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "How much can I actually save with solar?",
    a: "Most Xeron residential clients cut 60–70% of their electricity bill immediately, and commercial clients often save more by offsetting peak demand charges. Over a 25-year system life, savings routinely run into lakhs for homes and crores for industry.",
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
    a: "Tier-1 modules carry 25-year performance warranties and inverters 5–10 years. Xeron provides 24×7 remote monitoring plus scheduled O&M so your plant keeps generating at peak for decades.",
  },
  {
    q: "Do you handle DISCOM approvals and net metering?",
    a: "Yes. End-to-end liaisoning with your DISCOM for net-metering and sanction is included in every Xeron EPC engagement — you never chase paperwork.",
  },
  {
    q: "Is my roof suitable for solar?",
    a: "Most rooftops are. Our free site audit assesses orientation, shadow profile, structural capacity and consumption to confirm suitability and size the optimal system before you commit anything.",
  },
];

export type Partner = { name: string };

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

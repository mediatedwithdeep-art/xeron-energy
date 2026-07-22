import Link from "next/link";
import Image from "next/image";
import { FiPhone, FiMail, FiMapPin, FiArrowUpRight } from "react-icons/fi";
import { FaLinkedinIn, FaInstagram, FaYoutube, FaFacebookF } from "react-icons/fa";
import { megaMenu, site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-ink">
      <div className="aurora-bg opacity-60">
        <div className="aurora-blob" style={{ width: 500, height: 500, left: "10%", bottom: "-30%", background: "var(--color-solar)", opacity: 0.14 }} />
        <div className="aurora-blob" style={{ width: 420, height: 420, right: "5%", bottom: "-25%", background: "var(--color-flux)", opacity: 0.12 }} />
      </div>

      <div className="container-x relative z-10 py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/brand/logo-dark.png"
                alt="Xeron Energy"
                width={200}
                height={180}
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-mist">
              Gujarat&apos;s premium Solar EPC contractor. Turnkey residential, commercial
              and industrial solar — engineered by government-sector experts with 18 years
              of electrical excellence.
            </p>
            <div className="mt-6 flex gap-2.5">
              {[
                { icon: FaLinkedinIn, href: site.social.linkedin, label: "LinkedIn" },
                { icon: FaInstagram, href: site.social.instagram, label: "Instagram" },
                { icon: FaYoutube, href: site.social.youtube, label: "YouTube" },
                { icon: FaFacebookF, href: site.social.facebook, label: "Facebook" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="flex h-10 w-10 items-center justify-center rounded-xl glass text-mist transition-all hover:text-solar hover:-translate-y-0.5"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {megaMenu.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-frost">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center gap-1 text-sm text-mist transition-colors hover:text-solar"
                    >
                      {l.label}
                      <FiArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-4 border-t border-white/8 pt-8 sm:grid-cols-3">
          <a href={site.phoneHref} className="flex items-center gap-3 text-sm text-mist transition-colors hover:text-solar">
            <FiPhone className="h-5 w-5 text-solar" />
            {site.phone}
          </a>
          <a href={site.emailHref} className="flex items-center gap-3 text-sm text-mist transition-colors hover:text-solar">
            <FiMail className="h-5 w-5 text-solar" />
            {site.email}
          </a>
          <div className="flex items-center gap-3 text-sm text-mist">
            <FiMapPin className="h-5 w-5 text-solar" />
            {site.address.line} — {site.address.postalCode}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-6 text-xs text-muted-ink sm:flex-row">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-volt shadow-[0_0_8px_var(--color-volt)]" />
            Building India&apos;s solar future, one rooftop at a time.
          </p>
        </div>
      </div>
    </footer>
  );
}

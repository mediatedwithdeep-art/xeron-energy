"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX, FiPhone, FiArrowUpRight } from "react-icons/fi";
import { megaMenu, navLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";

function Logo() {
  return (
    <Link href="/" aria-label="Xeron Energy home" className="flex items-center gap-2.5">
      <span className="relative flex h-10 w-10 items-center justify-center">
        <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-solar/50 to-ember/40 blur-[10px]" />
        <Image
          src="/brand/icon-dark.png"
          alt="Xeron Energy logo"
          width={40}
          height={34}
          priority
          className="relative h-8 w-auto object-contain"
        />
      </span>
      <span className="font-display text-lg font-bold tracking-tight">
        XERON<span className="text-gold"> ENERGY</span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const primary = navLinks.filter((l) =>
    ["/", "/about", "/projects", "/services", "/process", "/contact"].includes(l.href)
  );

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-[9990] flex justify-center px-3 pt-3"
      >
        <nav
          className={cn(
            "flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 md:px-5",
            scrolled ? "glass-strong shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]" : "bg-transparent"
          )}
        >
          <Logo />

          <div className="hidden items-center gap-1 lg:flex">
            {primary.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                data-cursor="hover"
                className={cn(
                  "group relative rounded-full px-4 py-2 text-sm text-mist transition-colors hover:text-frost",
                  pathname === l.href && "text-frost"
                )}
              >
                {l.label}
                {pathname === l.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-white/8"
                  />
                )}
              </Link>
            ))}
            <div className="group relative">
              <button
                data-cursor="hover"
                className="rounded-full px-4 py-2 text-sm text-mist transition-colors hover:text-frost"
              >
                More
              </button>
              <div className="invisible absolute right-0 top-full w-[560px] translate-y-2 pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="glass-strong grid grid-cols-3 gap-2 rounded-2xl p-4">
                  {megaMenu.map((col) => (
                    <div key={col.title}>
                      <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-solar/80">
                        {col.title}
                      </p>
                      <ul className="space-y-0.5">
                        {col.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className="block rounded-xl px-2 py-2 transition-colors hover:bg-white/6"
                            >
                              <span className="text-sm text-frost">{link.label}</span>
                              {link.description && (
                                <span className="block text-xs text-muted-ink">
                                  {link.description}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              data-cursor="hover"
              className="hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-solar-bright to-ember px-5 py-2.5 text-sm font-medium text-void transition-transform hover:brightness-110 sm:flex"
            >
              Free Audit <FiArrowUpRight className="h-4 w-4" />
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center rounded-xl glass text-frost lg:hidden"
            >
              {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9989] lg:hidden"
          >
            <div className="absolute inset-0 bg-void/80 backdrop-blur-xl" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col gap-1 overflow-y-auto glass-strong p-6 pt-24"
            >
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.03 }}
                >
                  <Link
                    href={l.href}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-3 text-lg text-mist transition-colors hover:bg-white/6 hover:text-frost",
                      pathname === l.href && "text-solar"
                    )}
                  >
                    {l.label}
                    <FiArrowUpRight className="h-4 w-4 opacity-40" />
                  </Link>
                </motion.div>
              ))}
              <a
                href={site.phoneHref}
                className="mt-4 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-solar-bright to-ember px-5 py-3.5 font-medium text-void"
              >
                <FiPhone className="h-4 w-4" /> {site.phone}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

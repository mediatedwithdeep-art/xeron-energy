"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { site } from "@/lib/site";

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={site.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Xeron Energy on WhatsApp"
      data-cursor="hover"
      className="fixed bottom-5 right-5 z-[9997] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.6)]"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.6, type: "spring", stiffness: 180, damping: 14 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" />
      <FaWhatsapp className="relative h-7 w-7" />
    </motion.a>
  );
}

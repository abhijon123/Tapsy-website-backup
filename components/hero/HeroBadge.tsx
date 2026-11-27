"use client";

import React from "react";
import { motion } from "framer-motion";
import { Video, ArrowRight } from "lucide-react";

export function HeroBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-badge text-xs sm:text-sm font-medium text-foreground/80 hover:text-foreground transition-all cursor-pointer group mb-6 shadow-sm border border-purple-500/20 hover:border-purple-500/40"
    >
      <span className="flex h-2 w-2 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-gradient-to-r from-purple-600 to-pink-500" />
      </span>
      <Video className="w-3.5 h-3.5 text-purple-600" />
      <span>Why type reviews when you can tap?</span>
      <span className="px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300">
        New
      </span>
      <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
    </motion.div>
  );
}


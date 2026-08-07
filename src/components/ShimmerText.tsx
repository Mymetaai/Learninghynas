"use client";

import { motion } from "framer-motion";
import { cn } from "../lib/utils";

interface Text_01Props {
  text?: string;
  className?: string;
}

export default function ShimmerText({
  text = "The Unearthly Vault",
  className,
}: Text_01Props) {
  return (
    <div className="flex items-center justify-center p-1">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden px-4 py-1"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          animate={{
            backgroundPosition: ["200% center", "-200% center"],
          }}
          className={cn(
            "bg-[length:200%_100%] bg-gradient-to-r from-[#4A5E4A] via-[#A8C3A8] to-[#4A5E4A] bg-clip-text font-bold text-xl text-transparent dark:from-white dark:via-[#A8C3A8] dark:to-white font-serif italic tracking-wide",
            className
          )}
          transition={{
            duration: 2.5,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          {text}
        </motion.h1>
      </motion.div>
    </div>
  );
}

'use client';
import { motion } from "framer-motion";
import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" };

export default function Button({ className, variant = "primary", ...props }: Props) {
  const base = "px-5 py-3 rounded-2xl font-semibold shadow-soft";
  const styles = variant === "primary"
    ? "bg-romagnoli-red text-white hover:opacity-90"
    : "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50";

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -1 }}
      className={clsx(base, styles, className)}
      {...props}
    />
  );
}

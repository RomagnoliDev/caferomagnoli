'use client';
import { motion } from "framer-motion";

type Props = { title: string; description?: string; children?: React.ReactNode };

export default function Card({ title, description, children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-black rounded-2xl border border-black p-6"
    >
      <h3 className="text-gray-600 font-semibold">{title}</h3>
      {description && <p className="text-gray-600 mt-2">{description}</p>}
      {children && <div className="mt-4">{children}</div>}
    </motion.div>
  );
}

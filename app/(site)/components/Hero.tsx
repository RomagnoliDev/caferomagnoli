'use client';

import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
  title: string;
  subtitle?: string;
  cta?: React.ReactNode;
  imageSrc: string;
  dark?: boolean;
};

export default function Hero({ title, subtitle, cta, imageSrc }: Props) {
  return (
    <section >
      <div className="flex justify-center max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-1 gap-10 items-center">

        <div className="relative max-w-xs w-full h-48 rounded-2xl overflow-hidden">
          <Image
            src={imageSrc}
            alt="Hero"
            fill
            className="object-contain"
          />
        </div>

        <div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl leading-tight text-red-600"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <p className="mt-4 text-lg opacity-90 text-red-600">
              {subtitle}
            </p>
          )}

          {cta && <div className="mt-8">{cta}</div>}
        </div>

      </div>
    </section>
  );
}

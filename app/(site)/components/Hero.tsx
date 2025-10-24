import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
  title: string;
  subtitle?: string;
  cta?: React.ReactNode;
  imageSrc: string;
  dark?: boolean;
};

export default function Hero({ title, subtitle, cta, imageSrc, dark }: Props) {
  return (
    <section className={(dark ? "bg-toscano-smoke text-white" : "bg-romagnoli-cream") + " relative overflow-hidden"}>
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl md:text-5xl leading-tight"
          >
            {title}
          </motion.h1>
          {subtitle && <p className="mt-4 text-lg opacity-90">{subtitle}</p>}
          {cta && <div className="mt-8">{cta}</div>}
        </div>
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-soft">
          <Image src={imageSrc} alt="Hero" fill className="object-cover" />
        </div>
      </div>
    </section>
  );
}

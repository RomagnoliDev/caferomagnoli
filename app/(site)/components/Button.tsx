'use client';
import { motion, HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';

type ButtonProps = HTMLMotionProps<'button'> & {
  className?: string;
};

export default function Button({ className, ...props }: ButtonProps) {
  const base = "rounded-xl px-4 py-3 text-white bg-blue-600 hover:bg-blue-700";

  return (
    <motion.button
      {...props}
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -1 }}
      className={clsx(base, className)}
    />
  );
}

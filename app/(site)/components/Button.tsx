'use client';
import { motion, HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';

type ButtonProps = HTMLMotionProps<'button'> & {
  className?: string;
  variant?: 'primary' | 'secondary';
};

export default function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  const base = "rounded-xl px-4 py-3 text-white";

  const styles = clsx(
    base,
    variant === 'primary' && "bg-blue-600 hover:bg-blue-700",
    variant === 'secondary' && "bg-gray-200 text-gray-800 hover:bg-gray-300",
    className
  );

  return (
    <motion.button
      {...props}
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -1 }}
      className={styles}
    />
  );
}

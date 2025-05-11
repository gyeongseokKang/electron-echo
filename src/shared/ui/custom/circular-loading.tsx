"use client";

import { motion } from "motion/react";

interface CircularLoadingProps {
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-4 h-4 border-2",
  md: "w-8 h-8 border-4",
  lg: "w-12 h-12 border-6",
};

function CircularLoading({ size = "md" }: CircularLoadingProps) {
  return (
    <motion.div
      className={`aspect-square rounded-full border-solid border-divider border-t-black will-change-transform ${sizeClasses[size]}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

export default CircularLoading;

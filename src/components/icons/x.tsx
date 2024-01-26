import React from 'react';
import { motion } from 'framer-motion';

interface xProps{
  height?: string | number;
  width?: string | number;
  color?: string;
}

export const AnimatedXIcon = ({height, width, color}: xProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="username-x">
      <motion.path
        d="M18 6 6 18"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      />
      <motion.path
        d="M6 6 L18 18"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4 }}
      />
    </svg>
  );
};


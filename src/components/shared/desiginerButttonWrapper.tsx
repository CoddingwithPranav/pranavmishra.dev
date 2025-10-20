'use client';

import { motion } from 'framer-motion';
import DesignerButton from '../designerButton/designerButton';

interface AnimatedButtonProps {
  x?: number | string; // px or percentage
  y?: number | string;
  path?: 'float' | 'circle' | 'side';
  duration?: number;
  direction?: 'left' | 'right';
  text?: string;
}

export default function OtherDesignerButtonMotionWrapper({
  x = 0,
  y = 0,
  path = 'float',
  duration = 3,
  direction = 'left',
  text = 'Develop Now',
}: AnimatedButtonProps) {
  let animateProps = {};

  switch (path) {
    case 'circle':
      animateProps = {
        x: [0, 20, 0, -20, 0],
        y: [0, -20, -40, -20, 0],
      };
      break;
    case 'side':
      animateProps = { x: [0, 20, 0, -20, 0] };
      break;
    default:
      // Default = floating up-down motion
      animateProps = { y: [0, -15, 0] };
      break;
  }

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: typeof x === 'number' ? `${x}px` : x,
        top: typeof y === 'number' ? `${y}px` : y,
      }}
      animate={animateProps}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="inline-block"
    >
      <DesignerButton text={text} direction={direction} />
    </motion.div>
  );
}

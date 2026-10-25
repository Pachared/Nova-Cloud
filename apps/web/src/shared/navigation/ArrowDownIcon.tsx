"use client";

import { motion, useAnimation, useReducedMotion, type Variants } from "motion/react";
import { forwardRef, useImperativeHandle, useRef, type HTMLAttributes } from "react";

export interface ArrowDownIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ArrowDownIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  loop?: boolean;
}

const PATH_VARIANTS: Variants = {
  normal: { d: "m19 12-7 7-7-7", translateY: 0 },
  animate: {
    d: "m19 12-7 7-7-7",
    translateY: [0, -3, 0],
    transition: { duration: 0.4 },
  },
  loop: {
    d: "m19 12-7 7-7-7",
    translateY: [0, -3, 0],
    transition: { duration: 0.6, repeat: Infinity, repeatDelay: 0.7 },
  },
};

const SECOND_PATH_VARIANTS: Variants = {
  normal: { d: "M12 5v14" },
  animate: {
    d: ["M12 5v14", "M12 5v9", "M12 5v14"],
    transition: { duration: 0.4 },
  },
  loop: {
    d: ["M12 5v14", "M12 5v9", "M12 5v14"],
    transition: { duration: 0.6, repeat: Infinity, repeatDelay: 0.7 },
  },
};

const ArrowDownIcon = forwardRef<ArrowDownIconHandle, ArrowDownIconProps>(
  ({ onMouseEnter, onMouseLeave, size = 28, loop = false, ...props }, ref) => {
    const controls = useAnimation();
    const reducedMotion = useReducedMotion();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => { void controls.start(reducedMotion ? "normal" : "animate"); },
        stopAnimation: () => { void controls.start("normal"); },
      };
    }, [controls, reducedMotion]);

    return (
      <div
        {...props}
        onMouseEnter={(event) => {
          if (!isControlledRef.current) void controls.start(reducedMotion ? "normal" : "animate");
          onMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          if (!isControlledRef.current) void controls.start("normal");
          onMouseLeave?.(event);
        }}
      >
        <svg aria-hidden="true" fill="none" height={size} width={size} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <motion.path initial="normal" animate={loop ? (reducedMotion ? "normal" : "loop") : controls} d="m19 12-7 7-7-7" variants={PATH_VARIANTS} />
          <motion.path initial="normal" animate={loop ? (reducedMotion ? "normal" : "loop") : controls} d="M12 5v14" variants={SECOND_PATH_VARIANTS} />
        </svg>
      </div>
    );
  }
);

ArrowDownIcon.displayName = "ArrowDownIcon";
export { ArrowDownIcon };

import React from 'react';
import { motion } from 'framer-motion';

const anim = {
    initial: {
        top: "0"
    },
    animate: {
        top: "100vh",
        transition: { duration: 0.75, delay: 0.05, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
        transitionEnd: { top: "100vh" }
    },
    exit: {
        top: "0",
        transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }
    }
}

const curve = {
    initial: {
        d: "M0 0 L100 0 L100 100 Q-100 50 0 0"
    },
    animate: {
        d: "M0 0 L100 0 L100 100 Q100 50 0 0",
        transition: { duration: 0.75, delay: 0.05, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }
    },
    exit: {
        d: "M0 0 L100 0 L100 100 Q-100 50 0 0",
        transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }
    }
}

const Transition = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
        <div className="curve-transition">
            <motion.svg 
                className="w-full h-[calc(100vh+600px)] absolute -top-[300px] left-0 pointer-events-none fill-text dark:fill-background"
                {...anim}
            >
                {/* We use a simple sliding rect for stability in this demo, simulating the curve via timing */}
                <motion.rect width="100%" height="100%" />
            </motion.svg>
        </div>
        {children}
    </>
  );
};

// Simplified SVG Curve overlay for route changes
export const CurveTransition = () => {
    return (
        <motion.div 
            className="fixed top-0 left-0 w-full h-full bg-text dark:bg-text-dark z-[999] pointer-events-none"
            initial={{ scaleY: 1, transformOrigin: 'bottom' }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 0 }} // We handle exit in the wrapper
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }}
        />
    )
}

export default Transition;
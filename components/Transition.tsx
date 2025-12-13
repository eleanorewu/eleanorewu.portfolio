import { motion } from 'framer-motion';

// Simplified SVG Curve overlay for route changes
export const CurveTransition = () => {
    return (
        <motion.div 
            className="fixed top-0 left-0 w-full h-full bg-text dark:bg-text-dark z-[999] pointer-events-none"
            initial={{ scaleY: 1, transformOrigin: 'bottom' }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }}
        />
    )
}
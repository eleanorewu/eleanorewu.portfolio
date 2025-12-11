import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface MarqueeParallaxProps {
  text: string;
  reverse?: boolean;
  speed?: number;
}

const MarqueeParallax: React.FC<MarqueeParallaxProps> = ({ 
  text, 
  reverse = false,
  speed = 1
}) => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // 視差效果：滾動時文字會水平移動
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    reverse ? ['-5%', '5%'] : ['5%', '-5%']
  );

  return (
    <div ref={containerRef} className="w-full whitespace-nowrap py-4 relative" style={{ overflow: 'visible', zIndex: 50 }}>
      <motion.div
        style={{ x }}
        className="flex gap-8 md:gap-12 relative"
      >
        {/* 重複文字以創造無縫效果 */}
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="animate-marquee"
            style={{
              animationDirection: reverse ? 'reverse' : 'normal',
              animationDuration: `${30 / speed}s`
            }}
          >
            <span 
              className="text-[15vw] md:text-[12vw] font-display font-bold text-text dark:text-white tracking-tighter inline-block" 
              style={{ 
                display: 'inline-block',
                verticalAlign: 'baseline',
                overflow: 'visible',
                lineHeight: '1.3'
              }}
            >
              {text}
            </span>
          </div>
        ))}
      </motion.div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee linear infinite;
          display: inline-flex;
          align-items: center;
        }
      `}} />
    </div>
  );
};

export default MarqueeParallax;

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, animate } from 'framer-motion';

interface MarqueeParallaxProps {
  text: string;
  reverse?: boolean;
  speed?: number;
  theme?: 'light' | 'dark';
}

const MarqueeParallax: React.FC<MarqueeParallaxProps> = ({ 
  text, 
  reverse = false,
  speed = 1,
  theme = 'light'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [firstGroupWidth, setFirstGroupWidth] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // 視差效果：滾動時文字會水平移動
  const parallaxX = useTransform(
    scrollYProgress,
    [0, 1],
    reverse ? ['-5%', '5%'] : ['5%', '-5%']
  );

  // 走馬燈動畫的 motion value（使用像素值而不是百分比）
  const marqueeX = useMotionValue(0);

  // 測量第一組的寬度（包括所有第一組元素）
  useEffect(() => {
    if (!marqueeRef.current) return;

    const firstGroupElements = marqueeRef.current.querySelectorAll('[data-group="first"]');
    if (firstGroupElements.length > 0) {
      // 計算第一組的總寬度（最後一個元素的右邊界減去第一個元素的左邊界）
      const firstElement = firstGroupElements[0];
      const lastElement = firstGroupElements[firstGroupElements.length - 1];
      const firstRect = firstElement.getBoundingClientRect();
      const lastRect = lastElement.getBoundingClientRect();
      const width = lastRect.right - firstRect.left;
      setFirstGroupWidth(width);
    }
  }, [text]);

  // 設置無限循環的動畫
  useEffect(() => {
    if (firstGroupWidth === 0) return;

    const duration = 80000 / speed; // 80秒除以速度（非常慢的速度）
    const distance = -firstGroupWidth;

    const animateLoop = () => {
      marqueeX.set(0);
      
      const controls = animate(
        marqueeX,
        distance,
        {
          duration: duration / 1000, // 轉換為秒
          ease: 'linear',
          onComplete: () => {
            // 動畫完成後立即開始下一輪（無縫循環）
            animateLoop();
          }
        }
      );

      return controls;
    };

    const controls = animateLoop();

    return () => {
      controls.stop();
    };
  }, [marqueeX, speed, firstGroupWidth]);

  // 創建兩組完全相同的元素
  const repetitions = 6;
  const textElements = Array(repetitions).fill(text);

  return (
    <div ref={containerRef} className="w-full whitespace-nowrap py-2 sm:py-4 relative overflow-hidden md:overflow-visible" style={{ zIndex: 50 }}>
      {/* 外層：視差效果 */}
      <motion.div
        style={{ x: parallaxX }}
        className="relative"
      >
        {/* 內層：走馬燈動畫 */}
        <motion.div 
          ref={marqueeRef}
          className="flex gap-4 sm:gap-8 md:gap-12 relative"
          style={{
            display: 'flex',
            alignItems: 'center',
            x: marqueeX
          }}
        >
          {/* 第一組 */}
          {textElements.map((item, index) => (
            <div
              key={`first-${index}`}
              data-group="first"
              data-index={index === 0 ? 'first' : undefined}
              className="flex-shrink-0"
            >
              <span 
                className="text-[10vw] sm:text-[12vw] md:text-[12vw] font-display font-bold tracking-tighter inline-block"
                style={{ 
                  display: 'inline-block',
                  verticalAlign: 'baseline',
                  overflow: 'visible',
                  lineHeight: '1.3',
                  color: theme === 'dark' ? '#7965EC' : '#8C7EEB'
                }}
              >
                {item}
              </span>
            </div>
          ))}
          {/* 第二組：完全相同的內容用於無縫循環 */}
          {textElements.map((item, index) => (
            <div
              key={`second-${index}`}
              className="flex-shrink-0"
            >
              <span 
                className="text-[10vw] sm:text-[12vw] md:text-[12vw] font-display font-bold tracking-tighter inline-block"
                style={{ 
                  display: 'inline-block',
                  verticalAlign: 'baseline',
                  overflow: 'visible',
                  lineHeight: '1.3',
                  color: theme === 'dark' ? '#7965EC' : '#8C7EEB'
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MarqueeParallax;

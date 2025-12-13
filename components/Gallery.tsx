import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface GalleryItem {
  id: number;
  image: string;
  alt: string;
}

interface GalleryProps {
  items: GalleryItem[];
}

// RGB 轉 HSL
const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [h * 360, s * 100, l * 100];
};

// HSL 轉 RGB
const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

// 從圖片提取主要顏色並降低飽和度
const extractDominantColor = async (imageUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }

        // 縮小圖片以提高性能，取樣分析
        const sampleSize = 100;
        canvas.width = sampleSize;
        canvas.height = sampleSize;
        ctx.drawImage(img, 0, 0, sampleSize, sampleSize);

        const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize);
        const data = imageData.data;

        // 計算平均顏色
        let r = 0, g = 0, b = 0;
        let pixelCount = 0;
        
        for (let i = 0; i < data.length; i += 4) {
          const alpha = data[i + 3];
          if (alpha > 0) { // 跳過透明像素
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
            pixelCount++;
          }
        }

        if (pixelCount === 0) {
          resolve('rgb(240, 240, 240)'); // 默認淺灰色
          return;
        }

        r = Math.round(r / pixelCount);
        g = Math.round(g / pixelCount);
        b = Math.round(b / pixelCount);

        // 轉換為 HSL 並降低飽和度
        const [h, s, l] = rgbToHsl(r, g, b);
        const lowSaturation = Math.max(s * 0.15, 8); // 降低到 15% 或至少 8%，讓背景更柔和
        const adjustedL = Math.min(l + 20, 95); // 提高亮度使其更柔和

        // 轉回 RGB
        const [finalR, finalG, finalB] = hslToRgb(h, lowSaturation, adjustedL);
        const color = `rgb(${finalR}, ${finalG}, ${finalB})`;

        resolve(color);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      resolve('rgb(240, 240, 240)'); // 默認淺灰色
    };

    img.src = imageUrl;
  });
};

const Gallery: React.FC<GalleryProps> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // 調整 offset：當畫廊進入視窗底部時開始觸發，離開視窗頂部時結束
  // 這樣畫廊在可見時就能立即有互動效果
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // 存儲每個圖片的背景色，使用圖片 URL 作為 key 以支持圖片變更時重新提取
  const [backgroundColors, setBackgroundColors] = useState<Record<string, string>>({});
  
  // 響應式滾動距離和容器高度
  // 使用較小的滾動距離來減慢左右捲動速度（速度乘數約為 0.3-0.4）
  // 增加容器高度以延長觸發範圍，讓互動效果更持久
  const [scrollDistance, setScrollDistance] = useState({ top: -400, bottom: 350 });
  const [containerHeight, setContainerHeight] = useState('200vh');
  const [stickyHeight, setStickyHeight] = useState('100vh');

  useEffect(() => {
    const updateScrollDistance = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // 手機 - 減慢速度，增加觸發範圍
        setScrollDistance({ top: -200, bottom: 180 });
        setContainerHeight('150vh');
        setStickyHeight('50vh');
      } else if (width < 1024) {
        // 平板 - 減慢速度，增加觸發範圍
        setScrollDistance({ top: -300, bottom: 280 });
        setContainerHeight('180vh');
        setStickyHeight('100vh');
      } else {
        // 桌面 - 減慢速度，增加觸發範圍
        setScrollDistance({ top: -400, bottom: 350 });
        setContainerHeight('200vh');
        setStickyHeight('100vh');
      }
    };

    updateScrollDistance();
    window.addEventListener('resize', updateScrollDistance);
    return () => window.removeEventListener('resize', updateScrollDistance);
  }, []);

  // 將 items 分成兩排：前4個為上排，後4個為下排
  const topRowItems = items.slice(0, 4);
  const bottomRowItems = items.slice(4, 8);

  // 上排向左滾動 - 使用較慢的固定速度
  const topRowX = useTransform(scrollYProgress, [0, 1], [0, scrollDistance.top]);
  
  // 下排向右滾動 - 使用較慢的固定速度
  const bottomRowX = useTransform(scrollYProgress, [0, 1], [-100, scrollDistance.bottom]);

  // 複製圖片陣列以實現無限循環效果
  const topRowWorks = [...topRowItems, ...topRowItems, ...topRowItems];
  const bottomRowWorks = [...bottomRowItems, ...bottomRowItems, ...bottomRowItems];

  // 處理圖片加載並提取顏色
  const handleImageLoad = useCallback(async (item: GalleryItem, containerKey: string) => {
    // 使用圖片 URL 作為 key，這樣當圖片改變時會重新提取顏色
    const colorKey = item.image;
    
    // 如果已經有這個圖片的顏色，直接使用
    if (backgroundColors[colorKey]) {
      setBackgroundColors(prev => ({ ...prev, [containerKey]: backgroundColors[colorKey] }));
      return;
    }

    try {
      const color = await extractDominantColor(item.image);
      // 同時存儲到圖片 URL key 和容器 key
      setBackgroundColors(prev => ({ 
        ...prev, 
        [colorKey]: color,
        [containerKey]: color 
      }));
    } catch (error) {
      const defaultColor = 'rgb(240, 240, 240)';
      setBackgroundColors(prev => ({ 
        ...prev, 
        [colorKey]: defaultColor,
        [containerKey]: defaultColor 
      }));
    }
  }, [backgroundColors]);

  return (
    <div 
      ref={containerRef} 
      className="relative py-4 md:py-8 lg:py-16 bg-background dark:bg-background-dark"
      style={{ minHeight: containerHeight }}
    >
      <div 
        className="sticky top-0 flex flex-col items-center justify-center gap-2 md:gap-4 lg:gap-8 overflow-hidden px-2 md:px-4 lg:px-8"
        style={{ height: stickyHeight }}
      >
        {/* 上排 - 向左滾動 */}
        <motion.div
          style={{ x: topRowX }}
          className="flex gap-2 md:gap-4 lg:gap-8"
        >
          {topRowWorks.map((item, index) => {
            const containerKey = `top-${item.id}-${index}`;
            // 優先使用圖片 URL 的顏色，如果沒有則使用容器 key 的顏色
            const bgColor = backgroundColors[item.image] || backgroundColors[containerKey] || 'rgb(255, 255, 255)';
            return (
              <div
                key={containerKey}
                className="relative flex-shrink-0 overflow-hidden py-2 px-2 md:py-4 md:px-3 lg:py-8 lg:px-6 transition-colors duration-500 max-w-[200px] sm:max-w-[240px] md:max-w-[300px] lg:max-w-[420px]"
                style={{ 
                  width: '100%',
                  aspectRatio: '4/3',
                  backgroundColor: bgColor,
                }}
              >
                <img
                  key={item.image}
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: '4/3' }}
                  onLoad={() => handleImageLoad(item, containerKey)}
                />
              </div>
            );
          })}
        </motion.div>

        {/* 下排 - 向右滾動 */}
        <motion.div
          style={{ x: bottomRowX }}
          className="flex gap-2 md:gap-4 lg:gap-8"
        >
          {bottomRowWorks.map((item, index) => {
            const containerKey = `bottom-${item.id}-${index}`;
            // 優先使用圖片 URL 的顏色，如果沒有則使用容器 key 的顏色
            const bgColor = backgroundColors[item.image] || backgroundColors[containerKey] || 'rgb(255, 255, 255)';
            return (
              <div
                key={containerKey}
                className="relative flex-shrink-0 overflow-hidden py-2 px-2 md:py-4 md:px-3 lg:py-8 lg:px-6 transition-colors duration-500 max-w-[200px] sm:max-w-[240px] md:max-w-[300px] lg:max-w-[420px]"
                style={{ 
                  width: '100%',
                  aspectRatio: '4/3',
                  backgroundColor: bgColor,
                }}
              >
                <img
                  key={item.image}
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: '4/3' }}
                  onLoad={() => handleImageLoad(item, containerKey)}
                />
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Gallery;
